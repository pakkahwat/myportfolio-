'use client'

// One document-level listener feeds the pointer position to whichever .tile is
// under it, so every tile's ::before spotlight can follow the cursor without a
// listener per card. Mouse/pen only — touch has no hover.
import { useEffect } from 'react'

export default function SpotlightEffect() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const tile = (e.target as Element | null)?.closest?.('.tile') as HTMLElement | null
      if (!tile) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = tile.getBoundingClientRect()
        tile.style.setProperty('--mx', `${e.clientX - r.left}px`)
        tile.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointermove', onMove)
    }
  }, [])

  return null
}
