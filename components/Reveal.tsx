'use client'

// Wrapper around useReveal so it can be attached to elements produced inside
// a .map() (React hooks can't be called directly inside a loop, but each
// <Reveal> here is its own component instance). Adds the `data-reveal` marker
// the CSS keys off.
import { cloneElement, isValidElement, type ReactElement } from 'react'
import { useReveal } from '@/lib/directives'

export default function Reveal({
  delay = 0,
  children,
}: {
  delay?: number
  children: ReactElement<any>
}) {
  const ref = useReveal<HTMLElement>(delay)
  if (!isValidElement(children)) return children
  return cloneElement(children, { ref, 'data-reveal': '' } as any)
}
