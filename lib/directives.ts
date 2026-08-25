'use client'

// React ports of the original Nuxt client-side directives.
//
//   useReveal(delay?)   fades + lifts an element into view the first time it
//                       enters the viewport. Respects prefers-reduced-motion
//                       (elements just appear). Optional delay in ms staggers
//                       the transition.
//   useTilt(max?)       3D parallax tilt that follows the cursor, with a soft
//                       amber glare overlay. max = max tilt in degrees (default 9).
//   useMagnetic(strength?) element is gently pulled toward the cursor while
//                       hovered. strength 0–1 (default 0.25).
//
// Tilt/Magnetic bail out entirely under prefers-reduced-motion or on coarse
// (touch) pointers, where the effects would be useless or janky.
import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal--in')
      return
    }

    if (delay) el.style.transitionDelay = `${delay}ms`
    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])

  return ref
}

export function useTilt<T extends HTMLElement>(max = 9) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer =
      typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    if (reduce || !finePointer) return

    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)'

    const glare = document.createElement('span')
    glare.className = 'tilt-glare'
    el.appendChild(glare)

    let raf = 0
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rx = (0.5 - py) * max * 2
        const ry = (px - 0.5) * max * 2
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`
        glare.style.setProperty('--mx', `${px * 100}%`)
        glare.style.setProperty('--my', `${py * 100}%`)
        glare.style.opacity = '1'
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = ''
      glare.style.opacity = '0'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      glare.remove()
    }
  }, [max])

  return ref
}

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer =
      typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    if (reduce || !finePointer) return

    el.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
