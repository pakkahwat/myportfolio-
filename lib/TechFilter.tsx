'use client'

// Shared "which tech is selected" state: the toolbox tile in the hero sets it,
// the projects section shows only the work that used that tech. Changes run
// inside a View Transition (where supported) so cards glide into place
// instead of jumping.
import { createContext, useContext, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

interface TechFilterValue {
  tech: string | null
  setTech: (t: string | null, opts?: { animate?: boolean }) => void
}

const TechFilterContext = createContext<TechFilterValue | null>(null)

export function TechFilterProvider({ children }: { children: ReactNode }) {
  const [tech, setTechState] = useState<string | null>(null)

  function setTech(next: string | null, { animate = true }: { animate?: boolean } = {}) {
    const apply = () => flushSync(() => setTechState(next))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!animate || !document.startViewTransition || reduce) apply()
    else document.startViewTransition(apply)
  }

  return <TechFilterContext.Provider value={{ tech, setTech }}>{children}</TechFilterContext.Provider>
}

export function useTechFilter() {
  const ctx = useContext(TechFilterContext)
  if (!ctx) throw new Error('useTechFilter must be used within a TechFilterProvider')
  return ctx
}
