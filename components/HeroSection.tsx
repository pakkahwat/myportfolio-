'use client'

import { useState } from 'react'
import { profile, kpis, ui, resumeFiles } from '@/lib/resume'
import { useT } from '@/lib/useT'
import { Icon } from './ui'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const { t, locale } = useT()
  const [imgError, setImgError] = useState(false)

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {t(ui.available)}
          </p>

          <h1 id="hero-name" className={styles.name}>
            {t(profile.name)}
          </h1>
          <p className={styles.role}>{t(profile.title)}</p>
          <p className={styles.pitch}>{t(ui.heroPitch)}</p>

          <p className={styles.location}>
            <Icon name="mapPin" size={16} />
            {profile.location}
            <span className={styles.sep} aria-hidden="true">
              ·
            </span>
            <span className="mono">{profile.focus}</span>
          </p>

          <div className={styles.actions}>
            <a href="#projects" className="btn btn-primary">
              {t(ui.viewProjects)}
              <Icon name="arrowRight" size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t(ui.contactMe)}
            </a>
            <div className={styles.resume} role="group" aria-label={t(ui.resumeLabel)}>
              <span className={styles.resumeLabel}>
                <Icon name="download" size={16} />
                {t(ui.resume)}
              </span>
              {resumeFiles.map((f) => (
                <a
                  key={f.lang}
                  href={f.href}
                  download
                  className={`${styles.resumeLink} ${f.lang.toLowerCase() === locale ? styles.resumeLinkOn : ''}`}
                  aria-label={`${t(ui.resumeLabel)} ${f.lang}`}
                >
                  {f.lang}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.photoWrap}>
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photo}
              alt={t(profile.name)}
              width={320}
              height={320}
              className={styles.photo}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className={`${styles.photo} ${styles.initials}`}>{profile.initials}</span>
          )}
        </div>
      </div>

      <div className="container">
        <dl className={styles.stats}>
          {kpis.map((kpi) => (
            <div key={kpi.value} className={styles.stat}>
              <dt className={styles.statLabel}>{t(kpi.label)}</dt>
              <dd className={`${styles.statValue} mono`}>{kpi.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
