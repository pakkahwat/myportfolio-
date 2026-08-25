'use client'

// Animates the numeric part of a label up from zero the first time it scrolls
// into view, preserving any prefix/suffix (e.g. "99%+" counts 0→99, keeps "%+").
// Non-numeric values (e.g. "hrs→min") render as-is. Static under reduced motion.
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value }: { value: string }) {
  const elRef = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
    if (!m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    const [, pre, numStr, post] = m
    const target = parseFloat(numStr)
    const decimals = (numStr.split('.')[1] || '').length
    setDisplay(`${pre}0${post}`)

    const el = elRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        const dur = 1200
        const start = performance.now()
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(`${pre}${(target * eased).toFixed(decimals)}${post}`)
          if (t < 1) requestAnimationFrame(step)
          else setDisplay(value)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return <span ref={elRef}>{display}</span>
}
