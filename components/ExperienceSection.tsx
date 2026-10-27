'use client'

import { jobs } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import styles from './ExperienceSection.module.css'

export default function ExperienceSection() {
  const { t } = useT()

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader id="experience" />

        <ol className={styles.list}>
          {jobs.map((job, i) => (
            <Reveal key={job.company} delay={i * 50}>
              <li className={styles.item}>
                <p className={`${styles.period} mono`}>{t(job.period)}</p>
                <div>
                  <h3 className={styles.role}>{t(job.role)}</h3>
                  <p className={styles.company}>{job.company}</p>
                  <ul className={styles.bullets}>
                    {job.bullets.map((b, bi) => (
                      <li key={bi}>{t(b)}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
