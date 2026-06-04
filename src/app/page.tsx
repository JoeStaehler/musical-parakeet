import Link from 'next/link'
import { caseStudies } from '@/data/case-studies'

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 min-h-screen flex flex-col">
      <header className="flex items-start justify-between mb-20">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Your Name</h1>
          <p className="text-neutral-500 mt-1">Product Designer</p>
        </div>
        <Link
          href="/admin"
          className="text-sm text-neutral-300 hover:text-neutral-600 transition-colors mt-1"
        >
          Admin
        </Link>
      </header>

      <ol className="flex-1 divide-y divide-neutral-100">
        {caseStudies.map((study, i) => (
          <li key={study.slug}>
            <Link
              href={`/case-studies/${study.slug}`}
              className="group flex gap-6 py-8 -mx-4 px-4 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <span className="text-neutral-300 font-mono text-sm pt-0.5 w-6 shrink-0 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h2 className="text-lg font-medium">{study.title}</h2>
                  <span className="text-neutral-400 text-sm shrink-0 font-mono">{study.year}</span>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-2">{study.subtitle}</p>
                <p className="text-neutral-400 text-xs">
                  {study.role} · {study.client}
                </p>
              </div>
              <span className="text-neutral-300 group-hover:text-neutral-500 transition-colors pt-0.5 shrink-0">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <footer className="mt-20 pt-8 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} Your Name</p>
        <div className="flex gap-6">
          <a href="mailto:hello@example.com" className="hover:text-neutral-900 transition-colors">
            Email
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  )
}
