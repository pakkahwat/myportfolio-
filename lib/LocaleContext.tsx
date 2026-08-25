'use client'

// TH/EN locale context. Mirrors the Nuxt i18n `no_prefix` strategy: the
// single-page URL never changes, content is driven by reactive locale state.
// Defaults to English for every new visitor; the header toggle flips it at
// runtime (no persistence, matching the original).
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Locale = 'en' | 'th'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  // Keep <html lang> in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider')
  return ctx
}
