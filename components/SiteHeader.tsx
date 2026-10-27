'use client'

import { useEffect, useState } from 'react'
import { navItems, profile, ui } from '@/lib/resume'
import { useLocale } from '@/lib/LocaleContext'
import { useT } from '@/lib/useT'
import { Icon } from './ui'
import styles from './SiteHeader.module.css'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') root.dataset.theme = 'dark'
  else delete root.dataset.theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07080d' : '#f6f6fa')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode / blocked storage: the switch still works for this visit.
  }
}

// Desktop: sticky top bar with links. Phones: the top bar keeps only the
// name + language/theme buttons, and navigation moves to an app-style tab bar
// fixed to the bottom of the screen.
export default function SiteHeader() {
  const { locale, setLocale } = useLocale()
  const { t } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (window.scrollY < 200) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Highlight the nav item for the section in the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const item of navItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  const themeLabel = t(theme === 'dark' ? ui.themeToLight : ui.themeToDark)

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.barScrolled : ''}`}>
        <div className="container">
          <div className={`liquid ${styles.inner}`} data-elastic="top">
          <a href="#top" className={styles.brand}>
            {t(profile.name)}
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navLink} ${active === item.id ? styles.navLinkOn : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className={styles.tools}>
            <div className={styles.lang} role="group" aria-label={t(ui.language)}>
              <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
                EN
              </button>
              <button type="button" aria-pressed={locale === 'th'} onClick={() => setLocale('th')}>
                ไทย
              </button>
            </div>
            {/* Phones: one button that flips to the other language */}
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.langCompact}`}
              onClick={() => setLocale(locale === 'en' ? 'th' : 'en')}
              aria-label={`${t(ui.language)}: ${locale === 'en' ? 'ไทย' : 'English'}`}
              lang={locale === 'en' ? 'th' : 'en'}
            >
              {locale === 'en' ? 'ไทย' : 'EN'}
            </button>
            <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
          </div>
          </div>
        </div>
      </header>

      <nav className={`liquid ${styles.tabbar}`} aria-label="Sections" data-elastic="bottom">
        {navItems.map((item) => {
          const on = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.tab} ${on ? styles.tabOn : ''}`}
              aria-current={on ? 'true' : undefined}
            >
              <span className={styles.tabIcon}>
                <Icon name={item.icon} size={20} />
              </span>
              <span className={styles.tabLabel}>{t(item.label)}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
