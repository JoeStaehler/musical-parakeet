'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { CaseStudy, Section } from '@/data/case-studies'
import { caseStudies as defaultStudies } from '@/data/case-studies'

const STORAGE_KEY = 'portfolio-case-studies'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + uid()
}

const blankSection = (): Section => ({
  id: uid(),
  title: 'New Section',
  body: '',
  type: 'text',
  imageCaption: '',
})

const blankStudy = (): CaseStudy => ({
  slug: slugify('New Case Study'),
  title: 'New Case Study',
  subtitle: '',
  year: new Date().getFullYear().toString(),
  role: '',
  client: '',
  overview: '',
  sections: [],
})

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-500 mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neutral-400 transition-colors bg-white'

export default function AdminPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [showExport, setShowExport] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data: CaseStudy[] = raw ? JSON.parse(raw) : defaultStudies
    setStudies(data)
    setActiveSlug(data[0]?.slug ?? null)
    setMounted(true)
  }, [])

  const persist = (updated: CaseStudy[]) => {
    setStudies(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const active = studies.find((s) => s.slug === activeSlug) ?? null

  const updateStudy = <K extends keyof CaseStudy>(field: K, value: CaseStudy[K]) => {
    if (!activeSlug) return
    persist(studies.map((s) => (s.slug === activeSlug ? { ...s, [field]: value } : s)))
  }

  const addStudy = () => {
    const s = blankStudy()
    persist([...studies, s])
    setActiveSlug(s.slug)
    setShowExport(false)
  }

  const deleteStudy = () => {
    if (!activeSlug || !confirm('Delete this case study?')) return
    const updated = studies.filter((s) => s.slug !== activeSlug)
    persist(updated)
    setActiveSlug(updated[0]?.slug ?? null)
  }

  const moveStudy = (dir: 'up' | 'down') => {
    if (!activeSlug) return
    const idx = studies.findIndex((s) => s.slug === activeSlug)
    if (dir === 'up' && idx === 0) return
    if (dir === 'down' && idx === studies.length - 1) return
    const arr = [...studies]
    const swap = dir === 'up' ? idx - 1 : idx + 1
    ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
    persist(arr)
  }

  const addSection = () => {
    if (!active) return
    updateStudy('sections', [...active.sections, blankSection()])
  }

  const updateSection = <K extends keyof Section>(id: string, field: K, value: Section[K]) => {
    if (!active) return
    updateStudy(
      'sections',
      active.sections.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
    )
  }

  const deleteSection = (id: string) => {
    if (!active) return
    updateStudy('sections', active.sections.filter((s) => s.id !== id))
  }

  const moveSection = (id: string, dir: 'up' | 'down') => {
    if (!active) return
    const arr = [...active.sections]
    const idx = arr.findIndex((s) => s.id === id)
    if (dir === 'up' && idx === 0) return
    if (dir === 'down' && idx === arr.length - 1) return
    const swap = dir === 'up' ? idx - 1 : idx + 1
    ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
    updateStudy('sections', arr)
  }

  const exportJson = JSON.stringify(studies, null, 2)

  const copyExport = async () => {
    await navigator.clipboard.writeText(exportJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetDefaults = () => {
    if (!confirm('Reset all data to defaults? This will discard your changes.')) return
    persist(defaultStudies)
    setActiveSlug(defaultStudies[0]?.slug ?? null)
    setShowExport(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between shrink-0">
        <h1 className="font-medium text-sm">Admin Console</h1>
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          ← View Site
        </Link>
      </header>

      {/* Notice */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-2.5 shrink-0">
        <p className="text-xs text-amber-800">
          Changes save to your browser automatically. To update the live site, use{' '}
          <strong>Export Data</strong> and replace the array in{' '}
          <code className="font-mono">src/data/case-studies.ts</code>, then redeploy.
        </p>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-neutral-200 flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-neutral-100">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
              Case Studies
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {studies.map((s) => (
              <button
                key={s.slug}
                onClick={() => {
                  setActiveSlug(s.slug)
                  setShowExport(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors truncate ${
                  s.slug === activeSlug && !showExport
                    ? 'bg-neutral-100 text-neutral-900 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-neutral-100 space-y-2">
            <button
              onClick={addStudy}
              className="w-full py-2 px-3 text-sm bg-neutral-900 text-white rounded-md hover:bg-neutral-700 transition-colors"
            >
              + Add Case Study
            </button>
            <button
              onClick={() => setShowExport((v) => !v)}
              className={`w-full py-2 px-3 text-sm border rounded-md transition-colors ${
                showExport
                  ? 'border-neutral-900 text-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {showExport ? 'Hide Export' : 'Export Data'}
            </button>
            <button
              onClick={resetDefaults}
              className="w-full py-1.5 text-xs text-neutral-400 hover:text-red-500 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </aside>

        {/* Main area */}
        <main className="flex-1 overflow-y-auto">
          {showExport ? (
            <div className="p-8 max-w-3xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium">Export Data</h2>
                <button
                  onClick={copyExport}
                  className="py-2 px-4 text-sm bg-neutral-900 text-white rounded-md hover:bg-neutral-700 transition-colors min-w-[130px]"
                >
                  {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
              <p className="text-sm text-neutral-500 mb-5">
                Replace the <code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded">caseStudies</code> array in{' '}
                <code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded">src/data/case-studies.ts</code> with this JSON, then redeploy.
              </p>
              <pre className="bg-neutral-900 text-neutral-200 p-6 rounded-xl text-xs overflow-x-auto leading-relaxed font-mono">
                {exportJson}
              </pre>
            </div>
          ) : active ? (
            <div className="p-8 max-w-2xl">
              {/* Study header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-medium">
                  Editing:{' '}
                  <span className="text-neutral-500 font-normal">{active.title}</span>
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveStudy('up')}
                    title="Move up in list"
                    className="p-2 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors text-neutral-500"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveStudy('down')}
                    title="Move down in list"
                    className="p-2 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors text-neutral-500"
                  >
                    ↓
                  </button>
                  <button
                    onClick={deleteStudy}
                    className="py-2 px-3 text-sm text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Study fields */}
              <div className="space-y-5 pb-12 border-b border-neutral-100">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title">
                    <input
                      value={active.title}
                      onChange={(e) => updateStudy('title', e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Year">
                    <input
                      value={active.year}
                      onChange={(e) => updateStudy('year', e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field label="Subtitle">
                  <input
                    value={active.subtitle}
                    onChange={(e) => updateStudy('subtitle', e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Role">
                    <input
                      value={active.role}
                      onChange={(e) => updateStudy('role', e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Client">
                    <input
                      value={active.client}
                      onChange={(e) => updateStudy('client', e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field label="Overview">
                  <textarea
                    value={active.overview}
                    onChange={(e) => updateStudy('overview', e.target.value)}
                    rows={4}
                    className={inputCls + ' resize-none'}
                  />
                </Field>
              </div>

              {/* Sections */}
              <div className="pt-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-medium text-sm">
                    Sections{' '}
                    <span className="text-neutral-400 font-normal">({active.sections.length})</span>
                  </h3>
                  <button
                    onClick={addSection}
                    className="py-1.5 px-3 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    + Add Section
                  </button>
                </div>

                {active.sections.length === 0 && (
                  <div className="text-center py-10 border border-dashed border-neutral-200 rounded-xl">
                    <p className="text-sm text-neutral-400">
                      No sections yet.{' '}
                      <button
                        onClick={addSection}
                        className="underline hover:text-neutral-700 transition-colors"
                      >
                        Add one to get started.
                      </button>
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {active.sections.map((sec, sIdx) => (
                    <div
                      key={sec.id}
                      className="border border-neutral-200 rounded-xl p-5 bg-white space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                          Section {sIdx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveSection(sec.id, 'up')}
                            className="p-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors rounded"
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveSection(sec.id, 'down')}
                            className="p-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors rounded"
                            title="Move down"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => deleteSection(sec.id)}
                            className="p-1.5 text-xs text-neutral-400 hover:text-red-500 transition-colors rounded ml-1"
                            title="Delete section"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Title">
                          <input
                            value={sec.title}
                            onChange={(e) => updateSection(sec.id, 'title', e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Type">
                          <select
                            value={sec.type}
                            onChange={(e) =>
                              updateSection(sec.id, 'type', e.target.value as 'text' | 'image')
                            }
                            className={inputCls}
                          >
                            <option value="text">Text only</option>
                            <option value="image">Image + Text</option>
                          </select>
                        </Field>
                      </div>

                      <Field label="Body">
                        <textarea
                          value={sec.body}
                          onChange={(e) => updateSection(sec.id, 'body', e.target.value)}
                          rows={3}
                          className={inputCls + ' resize-none'}
                        />
                      </Field>

                      {sec.type === 'image' && (
                        <Field label="Image Caption">
                          <input
                            value={sec.imageCaption ?? ''}
                            onChange={(e) =>
                              updateSection(sec.id, 'imageCaption', e.target.value)
                            }
                            placeholder="Caption shown below the image placeholder"
                            className={inputCls}
                          />
                        </Field>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
              Select a case study to edit, or add a new one.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
