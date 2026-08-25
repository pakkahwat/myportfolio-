'use client'

import { useEffect, useState } from 'react'
import { navItems, profile } from '@/lib/resume'
import { useLocale } from '@/lib/LocaleContext'
import { Icon } from './ui'
import styles from './SiteHeader.module.css'

export default function SiteHeader() {
  const { locale, setLocale } = useLocale()
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(id: string) {
    setDrawer(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={`${styles.siteBar} ${scrolled ? styles.siteBarScrolled : ''}`}
        style={{ boxShadow: scrolled ? undefined : 'none' }}
      >
        <div className={`accent-bar ${styles.accentLine}`} />
        <div
          className={styles.scrollProgress}
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />

        <div className={styles.inner}>
          {/* Brand */}
          <button className={`${styles.brand} font-mono`} type="button" onClick={() => go('top')}>
            <span className={styles.brandBracket}>{'{'}</span>
            <span className={styles.brandName}>{profile.initials}</span>
            <span className={styles.brandBracket}>{'}'}</span>
          </button>

          <div className={styles.spacer} />

          {/* Desktop nav */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.navLink} font-mono`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
            <div className={`${styles.langSwitch} font-mono`} role="group" aria-label="Language">
              <button
                className={locale === 'en' ? styles.langOn : ''}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <span className={styles.langSep}>/</span>
              <button
                className={locale === 'th' ? styles.langOn : ''}
                onClick={() => setLocale('th')}
              >
                ไทย
              </button>
            </div>
            <button
              className={`v-btn v-btn--flat v-btn--primary v-btn--small font-mono ${styles.ctaBtn}`}
              onClick={() => go('contact')}
            >
              get_in_touch
            </button>
          </nav>

          {/* Mobile: language switch + menu toggle */}
          <div
            className={`${styles.langSwitch} font-mono ${styles.mobileLang}`}
            role="group"
            aria-label="Language"
          >
            <button
              className={locale === 'en' ? styles.langOn : ''}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
            <span className={styles.langSep}>/</span>
            <button
              className={locale === 'th' ? styles.langOn : ''}
              onClick={() => setLocale('th')}
            >
              ไทย
            </button>
          </div>
          <button
            className={styles.menuBtn}
            aria-label="Menu"
            onClick={() => setDrawer((d) => !d)}
          >
            <Icon icon="mdi-menu" size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`${styles.drawerBackdrop} ${drawer ? styles.drawerBackdropOpen : ''}`}
        onClick={() => setDrawer(false)}
      />
      <nav className={`${styles.drawer} ${drawer ? styles.drawerOpen : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.drawerItem} font-mono`}
            onClick={() => go(item.id)}
          >
            <span className="prompt">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
