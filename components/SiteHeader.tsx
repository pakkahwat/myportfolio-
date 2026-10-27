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
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d1117' : '#f8fafc')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode / blocked storage: the switch still works for this visit.
  }
}

export default function SiteHeader() {
  const { locale, setLocale } = useLocale()
  const { t } = useT()
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

    const onScroll = () => setScrolled(window.scrollY > 8)
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

  // Close the drawer on Escape.
  useEffect(() => {
    if (!drawer) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  const langSwitch = (
    <div className={styles.lang} role="group" aria-label={t(ui.language)}>
      <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
        EN
      </button>
      <button type="button" aria-pressed={locale === 'th'} onClick={() => setLocale('th')}>
        ไทย
      </button>
    </div>
  )

  const themeButton = (
    <button
      type="button"
      className={styles.iconBtn}
      onClick={toggleTheme}
      aria-label={t(theme === 'dark' ? ui.themeToLight : ui.themeToDark)}
      title={t(theme === 'dark' ? ui.themeToLight : ui.themeToDark)}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  )

  return (
    <header className={`${styles.bar} ${scrolled || drawer ? styles.barScrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setDrawer(false)}>
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
          <div className={styles.langInBar}>{langSwitch}</div>
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
          {themeButton}
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label={t(ui.menu)}
            aria-expanded={drawer}
            aria-controls="mobile-nav"
            onClick={() => setDrawer((d) => !d)}
          >
            <Icon name={drawer ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`${styles.drawer} ${drawer ? styles.drawerOpen : ''}`}
        aria-label="Mobile"
        hidden={!drawer}
      >
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={styles.drawerItem} onClick={() => setDrawer(false)}>
            {t(item.label)}
            <Icon name="arrowRight" size={16} />
          </a>
        ))}
      </nav>
    </header>
  )
}
