'use client'

import { useRouter } from 'next/navigation'

export default function BackLink() {
  const router = useRouter()

  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault()
        sessionStorage.setItem('nav-direction', 'back')
        router.push('/')
      }}
      className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
    >
      ← All Work
    </a>
  )
}
