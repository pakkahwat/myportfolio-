'use client'

import { profile, kpis, ui, resumeFiles } from '@/lib/resume'
import { useT } from '@/lib/useT'
import Reveal from './Reveal'
import CountUp from './CountUp'
import Toolbox from './Toolbox'
import { Icon } from './ui'
import styles from './HeroSection.module.css'

// Bento hero: intro tile + photo tile (desktop), four number tiles, toolbox.
// On phones the photo tile is dropped and a cropped face sits next to the name.
export default function HeroSection() {
  const { t, locale } = useT()
  const name = t(profile.name)
  const space = name.indexOf(' ')
  const first = space > 0 ? name.slice(0, space) : name
  const last = space > 0 ? name.slice(space + 1) : ''
  const resumeMain = resumeFiles.find((f) => f.lang.toLowerCase() === locale) ?? resumeFiles[0]
  const resumeAlt = resumeFiles.find((f) => f !== resumeMain) ?? resumeFiles[1]

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.bento}`}>
        <Reveal>
          <div className={`tile ${styles.intro}`}>
            {/* Phones/tablets: the face sits beside the status + name (two lines tall) */}
            <div className={styles.nameRow}>
              <span className={styles.face}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile-face.webp" alt="" width={84} height={84} />
              </span>
              {/* Name stays on one line: its size follows the box width (cqi) */}
              <div className={styles.nameBox}>
                <p className={styles.status}>
                  <span className="live-dot" aria-hidden="true" />
                  <span className={styles.statusLong}>{t(ui.available)}</span>
                  <span className={styles.statusShort}>{t(ui.availableShort)}</span>
                </p>
                <h1 id="hero-name" className={styles.name}>
                  {first}
                  {last && (
                    <>
                      {' '}
                      <span className="grad-text">{last}</span>
                    </>
                  )}
                </h1>
              </div>
            </div>

            <p className={styles.role}>{t(profile.title)}</p>
            <p className={styles.pitch}>{t(ui.heroPitch)}</p>

            <div className={styles.actions}>
              <a href="#projects" className="btn btn-primary">
                {t(ui.viewProjects)}
                <Icon name="arrowRight" size={16} />
              </a>
              <a href="#contact" className="btn">
                {t(ui.contactMe)}
              </a>
              <div className={styles.resumePair}>
                <a href={resumeMain.href} download className="btn" aria-label={`${t(ui.resumeLabel)} ${resumeMain.lang}`}>
                  <Icon name="download" size={16} />
                  {t(ui.resume)}
                  <span className={`${styles.lang} mono`}>{resumeMain.lang}</span>
                </a>
                <a
                  href={resumeAlt.href}
                  download
                  className={`btn ${styles.alt}`}
                  aria-label={`${t(ui.resumeLabel)} ${resumeAlt.lang}`}
                  title={`${t(ui.resumeLabel)} ${resumeAlt.lang}`}
                >
                  <Icon name="download" size={15} />
                  <span className="mono">{resumeAlt.lang}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={`tile ${styles.photo}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile-card.webp" alt={name} width={560} height={951} />
            <span className={styles.place}>
              <Icon name="mapPin" size={14} />
              {profile.location}
            </span>
          </div>
        </Reveal>

        {kpis.map((kpi, i) => (
          <Reveal key={kpi.value} delay={120 + i * 50}>
            <div className={`tile ${styles.stat}`}>
              <p className={`${styles.statValue} ${kpi.value.length > 4 ? styles.statLong : ''}`}>
                <CountUp value={kpi.value} />
              </p>
              <p className={styles.statLabel}>{t(kpi.label)}</p>
            </div>
          </Reveal>
        ))}

        <Reveal delay={200}>
          <div className={`tile ${styles.tools}`}>
            <Toolbox />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
