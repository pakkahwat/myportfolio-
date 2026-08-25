'use client'

import { jobs } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import { Chip } from './ui'
import styles from './ExperienceSection.module.css'

export default function ExperienceSection() {
  const { t } = useT()

  return (
    <section id="experience" className="py-12 py-md-16">
      <div className="container" style={{ maxWidth: 1080 }}>
        <SectionLabel label="work_experience" />

        <div className={styles.timeline}>
          {jobs.map((job, i) => (
            <div key={job.company} className={styles.timelineItem}>
              <span className={`${styles.dot} ${job.current ? styles.dotCurrent : ''}`}>
                {job.current && <span className={styles.tlPulse} />}
              </span>

              <Reveal delay={i * 60}>
                <div>
                  <div className="d-flex flex-wrap justify-space-between align-baseline ga-2">
                    <div>
                      <div className={styles.jobRole}>{t(job.role)}</div>
                      <div className={styles.jobCo}>{job.company}</div>
                    </div>
                    <Chip
                      size="x-small"
                      variant="tonal"
                      color={job.current ? 'primary' : undefined}
                      className={`font-mono ${styles.periodChip}`}
                    >
                      {t(job.period)}
                    </Chip>
                  </div>

                  <ul className={styles.bullets}>
                    {job.bullets.map((b, bi) => (
                      <li key={bi}>{t(b)}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
