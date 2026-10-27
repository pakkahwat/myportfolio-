'use client'

import { education } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { Icon } from './ui'
import styles from './EducationSection.module.css'

export default function EducationSection() {
  const { t } = useT()

  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeader id="education" />

        <Reveal>
          <div className={`tile ${styles.card}`}>
            <span className={styles.icon}>
              <Icon name="graduation" size={22} />
            </span>
            <div className={styles.body}>
              <h3 className={styles.degree}>{t(education.degree)}</h3>
              <p className={styles.uni}>{education.university}</p>
            </div>
            <div className={styles.side}>
              <p className="mono">{education.period}</p>
              <p className={styles.gpa}>{education.gpa}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
