'use client'

import { cloneElement, isValidElement, type ReactElement } from 'react'
import { useTilt } from '@/lib/directives'

export default function Tilt({
  max = 9,
  children,
}: {
  max?: number
  children: ReactElement<any>
}) {
  const ref = useTilt<HTMLElement>(max)
  if (!isValidElement(children)) return children
  return cloneElement(children, { ref } as any)
}
