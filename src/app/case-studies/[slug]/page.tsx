import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies } from '@/data/case-studies'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((cs) => cs.slug === slug)
  return { title: study ? `${study.title} — Portfolio` : 'Not Found' }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((cs) => cs.slug === slug)
  if (!study) notFound()

  const idx = caseStudies.findIndex((cs) => cs.slug === slug)
  const prev = idx > 0 ? caseStudies[idx - 1] : null
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 animate-slide-in">
      <nav className="mb-16">
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          ← All Work
        </Link>
      </nav>

      <header className="mb-16">
        <p className="text-xs text-neutral-400 font-mono tracking-wide mb-5">
          {study.year} · {study.client} · {study.role}
        </p>
        <h1 className="text-4xl font-medium tracking-tight leading-tight mb-4">{study.title}</h1>
        <p className="text-xl text-neutral-500 leading-relaxed mb-10">{study.subtitle}</p>
        <div className="h-px bg-neutral-100 mb-10" />
        <p className="text-neutral-600 leading-relaxed text-[15px]">{study.overview}</p>
      </header>

      <div className="space-y-16">
        {study.sections.map((section) => (
          <section key={section.id}>
            {section.type === 'image' ? (
              <div className="space-y-4">
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl aspect-video flex items-center justify-center">
                  <p className="text-neutral-300 text-sm select-none">[ Image ]</p>
                </div>
                {section.imageCaption && (
                  <p className="text-xs text-neutral-400 text-center">{section.imageCaption}</p>
                )}
                {section.title && (
                  <h2 className="text-base font-medium mt-6">{section.title}</h2>
                )}
                {section.body && (
                  <p className="text-neutral-600 leading-relaxed text-[15px]">{section.body}</p>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-base font-medium mb-3">{section.title}</h2>
                <p className="text-neutral-600 leading-relaxed text-[15px]">{section.body}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      <nav className="mt-24 pt-8 border-t border-neutral-100 flex items-center justify-between">
        {prev ? (
          <Link
            href={`/case-studies/${prev.slug}`}
            className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/case-studies/${next.slug}`}
            className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}
