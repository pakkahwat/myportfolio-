'use client'

// useReveal(delay?) — fades an element in the first time it reaches the
// viewport. The element must carry `data-reveal` in its markup; the hidden
// start state only applies under `html.js` (see globals.css), so content stays
// visible if JS never runs. Elements that are skipped past (e.g. jumping via
// the nav) are revealed too, so nothing is left blank above the viewport.
import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal--in')
      return
    }

    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('reveal--in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [delay])

  return ref
}
