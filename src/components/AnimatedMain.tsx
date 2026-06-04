'use client'

import { useLayoutEffect, useRef } from 'react'

export default function AnimatedMain({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const dir = sessionStorage.getItem('nav-direction')
    if (dir === 'back') {
      sessionStorage.removeItem('nav-direction')
      el.classList.add('animate-slide-in-left')
    }
  }, [])

  return (
    <main ref={ref} className={className}>
      {children}
    </main>
  )
}
