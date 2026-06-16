// A value that differs per language. Plain strings pass through unchanged —
// use them for proper nouns (names, brands, tech) that must NOT be translated.
export type Localized = string | { en: string; th: string }

// useT(): resolve Localized values against the active locale, reactively.
// `t(field)` re-evaluates when the locale changes, so wrapping data fields in
// templates with t(...) is enough to make the whole page switch languages.
export function useT() {
  const { locale } = useI18n()
  const t = (val: Localized): string => {
    if (typeof val === 'string') return val
    return val[(locale.value as 'en' | 'th')] ?? val.en
  }
  return { t, locale }
}
