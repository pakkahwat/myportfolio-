'use client'

// Elastic overscroll at the very top / bottom of the page: keep scrolling past
// the end and the content stretches like rubber from that edge (scaleY with
// the origin pinned to the edge, plus a little travel), with a soft aurora glow
// there; let go and it springs back with a small wobble. The floating bars
// (`data-elastic="top" | "bottom"`) move with the content as part of the same
// rubber sheet — same direction, same stretch — so nothing pulls the other
// way. Mouse wheel,
// trackpads and touch all work (the browser's own overscroll is turned off in
// globals.css so the two don't stack). Off under reduced motion.
import { useEffect, useRef } from 'react'

const MAX_PULL = 140 // px of finger / wheel travel the stretch saturates at
const STRETCH = 1 / 1100 // scaleY added per px of pull (≈ +13% at max)
const TRAVEL = 0.45 // share of the pull that also moves the content
const BAR_MAX_SHIFT = 72 // px — bars follow the content but never leave the screen entirely

// Spring with a slight overshoot and settle, as a CSS linear() easing.
const SPRING =
  'linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%, 0.938 16.7%, 1.017 19.4%, 1.067, 1.099 24.3%, 1.108 26%, 1.104, 1.088 29.7%, 1.008 38.1%, 0.98 42.3%, 0.974 45.2%, 0.975 48.4%, 1.002 59.6%, 1.006 68%, 1)'

export default function OverscrollEffect() {
  const topGlow = useRef<HTMLDivElement>(null)
  const bottomGlow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const main = document.getElementById('main')
    if (!main) return
    const easing = CSS.supports('transition-timing-function', SPRING) ? SPRING : 'cubic-bezier(0.2, 1.5, 0.4, 1)'
    // Floating bars, with their resting centre (viewport y) captured when a pull starts.
    const bars = [...document.querySelectorAll<HTMLElement>('[data-elastic]')].map((el) => ({ el, baseY: 0 }))

    let pull = 0 // + = pulled down past the top, − = pulled up past the bottom
    let releaseTimer: ReturnType<typeof setTimeout> | undefined
    let touchY: number | null = null

    const atTop = () => window.scrollY <= 0
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1

    const render = (springing: boolean) => {
      const amount = Math.abs(pull)
      const scale = 1 + amount * STRETCH
      const travel = pull * TRAVEL
      // The stretch is pinned to the screen edge being pulled.
      const edge = pull > 0 ? 0 : window.innerHeight
      if (pull !== 0) main.style.transformOrigin = `50% ${window.scrollY + edge - main.offsetTop}px`
      main.style.transition = springing ? `transform 0.8s ${easing}` : 'none'
      main.style.transform = pull ? `translateY(${travel.toFixed(1)}px) scaleY(${scale.toFixed(4)})` : ''

      // Each bar moves exactly as the content under it would (same formula as
      // the transform above), capped so it stays partly on screen, and takes
      // on most of the same stretch.
      for (const bar of bars) {
        if (!bar.el.offsetHeight) continue // e.g. the tab bar on desktop
        const shift = (bar.baseY - edge) * (scale - 1) + travel
        const capped = Math.max(-BAR_MAX_SHIFT, Math.min(BAR_MAX_SHIFT, shift))
        bar.el.style.transition = springing ? `transform 0.8s ${easing}, box-shadow 0.3s ease` : 'box-shadow 0.3s ease'
        bar.el.style.transform = pull
          ? `translateY(${capped.toFixed(1)}px) scaleY(${(1 + (scale - 1) * 0.8).toFixed(4)})`
          : ''
      }

      const strength = Math.min(1, amount / MAX_PULL)
      for (const [el, on] of [
        [topGlow.current, pull > 0],
        [bottomGlow.current, pull < 0],
      ] as const) {
        if (!el) continue
        el.style.opacity = on ? String(strength) : '0'
        el.style.transform = `scaleY(${on ? 0.6 + strength * 0.6 : 0.6})`
      }
    }
    const springBack = () => {
      pull = 0
      render(true)
    }
    // Resistance grows the further you pull, like a real rubber band.
    const stretch = (delta: number) => {
      if (pull === 0) {
        for (const bar of bars) {
          const r = bar.el.getBoundingClientRect()
          bar.baseY = r.top + r.height / 2
        }
      }
      pull += delta * 0.6 * (1 - Math.abs(pull) / MAX_PULL)
      pull = Math.max(-MAX_PULL, Math.min(MAX_PULL, pull))
      render(false)
    }

    const onWheel = (e: WheelEvent) => {
      if ((e.deltaY < 0 && atTop()) || (e.deltaY > 0 && atBottom())) {
        stretch(-e.deltaY * 0.45)
        clearTimeout(releaseTimer)
        releaseTimer = setTimeout(springBack, 150)
      } else if (pull) {
        springBack()
      }
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return
      const y = e.touches[0].clientY
      const dy = y - touchY
      touchY = y
      if (pull || (dy > 0 && atTop()) || (dy < 0 && atBottom())) stretch(dy)
    }
    const onTouchEnd = () => {
      touchY = null
      if (pull) springBack()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      clearTimeout(releaseTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      main.style.transform = ''
      main.style.transition = ''
      main.style.transformOrigin = ''
      for (const bar of bars) {
        bar.el.style.transform = ''
        bar.el.style.transition = ''
      }
    }
  }, [])

  return (
    <>
      <div ref={topGlow} className="edge-glow edge-glow-top" aria-hidden="true" />
      <div ref={bottomGlow} className="edge-glow edge-glow-bottom" aria-hidden="true" />
    </>
  )
}
