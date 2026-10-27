'use client'

import { jobs } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import styles from './ExperienceSection.module.css'

// Vertical timeline: a gradient rail on the left, one tile per job.
export default function ExperienceSection() {
  const { t } = useT()

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader id="experience" />

        <ol className={styles.timeline}>
          {jobs.map((job, i) => (
            <li key={job.company} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <Reveal delay={i * 50}>
                <div className={`tile ${styles.card}`}>
                  <div className={styles.head}>
                    <div>
                      <h3 className={styles.role}>{t(job.role)}</h3>
                      <p className={styles.company}>{job.company}</p>
                    </div>
                    <span className={`${styles.period} mono`}>{t(job.period)}</span>
                  </div>
                  <ul className={styles.bullets}>
                    {job.bullets.map((b, bi) => (
                      <li key={bi}>{t(b)}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
