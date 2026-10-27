'use client'

// Counts the numeric part of a value up from zero the first time it scrolls
// into view, keeping any prefix/suffix ("99%+" → 0…99 then "%+"). Values with
// no number ("hrs→min") and reduced-motion visitors get the final text as-is.
// The real value is in the HTML from the start, so it is never lost.
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
    const el = ref.current
    if (!m || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, pre, num, post] = m
    const target = parseFloat(num)
    const decimals = (num.split('.')[1] || '').length

    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1100)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(`${pre}${(target * eased).toFixed(decimals)}${post}`)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        setDisplay(`${pre}${(0).toFixed(decimals)}${post}`)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{display}</span>
}
