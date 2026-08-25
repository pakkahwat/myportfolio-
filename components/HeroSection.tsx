'use client'

import { useEffect, useRef, useState } from 'react'
import { profile, kpis, roles, ui } from '@/lib/resume'
import { useT } from '@/lib/useT'
import { useLocale } from '@/lib/LocaleContext'
import { useReveal, useMagnetic } from '@/lib/directives'
import { Chip, Avatar } from './ui'
import CountUp from './CountUp'
import HeroCanvas from './HeroCanvas'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const { t } = useT()
  const { locale } = useLocale()
  const [imgError, setImgError] = useState(false)

  // Looping typewriter for the role line: types a phrase, holds, deletes it,
  // then moves to the next — cycling through `roles` forever. The caret stays
  // solid while typing/deleting and blinks during the holds. Falls back to the
  // static title under reduced motion.
  const [typed, setTyped] = useState('')
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(t(profile.title))
      return
    }

    let phrase = 0
    let char = 0
    let deleting = false

    const tick = () => {
      const full = t(roles[phrase % roles.length]!)
      if (deleting) {
        char--
        setTyped(full.slice(0, char))
        if (char === 0) {
          deleting = false
          phrase++
          setBlink(true)
          timer = setTimeout(tick, 400) // pause before the next phrase
        } else {
          timer = setTimeout(tick, 28) // delete faster than typing
        }
      } else {
        char++
        setTyped(full.slice(0, char))
        setBlink(false)
        if (char === full.length) {
          deleting = true
          setBlink(true)
          timer = setTimeout(tick, 1700) // hold the completed phrase
        } else {
          timer = setTimeout(tick, 55)
        }
      }
    }
    timer = setTimeout(tick, 500)

    return () => {
      if (timer) clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const terminalRef = useReveal<HTMLDivElement>()
  const greetingRef = useReveal<HTMLParagraphElement>(60)
  const nameRef = useReveal<HTMLHeadingElement>(120)
  const titleRef = useReveal<HTMLParagraphElement>(180)
  const chipsRef = useReveal<HTMLDivElement>(240)
  const btnsRef = useReveal<HTMLDivElement>(300)
  const avatarRef = useReveal<HTMLDivElement>()
  const kpiRowRef = useReveal<HTMLDivElement>(120)

  const viewProjectsRef = useMagnetic<HTMLButtonElement>(0.3)
  const contactRef = useMagnetic<HTMLButtonElement>(0.3)

  return (
    <section id="top" className={`${styles.hero} grid-bg`}>
      <div className={`accent-bar ${styles.heroAccent}`} />
      <HeroCanvas />

      <div className={styles.heroContent}>
        <div className="row align-center py-10 py-md-14">
          {/* Left: identity */}
          <div className="col col-12 col-md-8 order-2 order-md-1">
            <div ref={terminalRef} className={`font-mono ${styles.terminalLine} mb-4`}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotAmber}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              <span className={styles.terminalPath}>~/pakkahwat — zsh</span>
            </div>

            <p ref={greetingRef} className={`font-mono prompt ${styles.greeting} mb-2`}>
              whoami
            </p>

            <h1 ref={nameRef} className={styles.heroName}>
              {t(profile.name)}
            </h1>

            <p ref={titleRef} className={`font-mono ${styles.heroTitle} prompt`}>
              {typed}
              <span className={`${styles.typeCaret} ${blink ? styles.typeCaretBlink : ''}`} />
            </p>

            <div ref={chipsRef} className="d-flex flex-wrap ga-2 mt-5">
              <Chip variant="tonal" color="primary" size="small" icon="mdi-map-marker-outline" className="font-mono">
                {profile.location}
              </Chip>
              <Chip variant="outlined" size="small" icon="mdi-laptop" className={`font-mono ${styles.chipMuted}`}>
                {profile.focus}
              </Chip>
            </div>

            <div ref={btnsRef} className="d-flex flex-wrap ga-3 mt-7">
              <button
                ref={viewProjectsRef}
                className={`v-btn v-btn--flat v-btn--primary font-mono ${styles.actionBtn} ${styles.actionBtnGlow}`}
                onClick={() => scrollTo('projects')}
              >
                <span className="mdi mdi-folder-multiple-outline v-icon-inline" aria-hidden="true" />
                view_projects
              </button>
              <button
                ref={contactRef}
                className={`v-btn v-btn--outlined v-btn--primary font-mono ${styles.actionBtn}`}
                onClick={() => scrollTo('contact')}
              >
                <span className="mdi mdi-email-outline v-icon-inline" aria-hidden="true" />
                contact_me
              </button>
            </div>
          </div>

          {/* Right: avatar */}
          <div className="col col-12 col-md-4 order-1 order-md-2 text-center text-md-end">
            <div ref={avatarRef} className={styles.avatarWrap}>
              <Avatar size={148} className={styles.avatar}>
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.photo} alt={t(profile.name)} onError={() => setImgError(true)} />
                ) : (
                  <span className={`font-mono ${styles.avatarInitials}`}>{profile.initials}</span>
                )}
              </Avatar>
              <span className={`${styles.statusPill} font-mono`}>
                <span className={styles.statusDot} /> {t(ui.available)}
              </span>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div ref={kpiRowRef} className={`row dense ${styles.kpiRow} pb-12`}>
          {kpis.map((kpi) => (
            <div key={kpi.value} className="col col-6 col-sm-3">
              <div className={styles.kpi}>
                <div className={`font-mono ${styles.kpiValue}`}>
                  <CountUp value={kpi.value} />
                </div>
                <div className={`font-mono ${styles.kpiLabel}`}>{t(kpi.label)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
