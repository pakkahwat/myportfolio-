'use client'

import { education } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import { Avatar, Chip, Icon } from './ui'
import styles from './EducationSection.module.css'

export default function EducationSection() {
  const { t } = useT()

  return (
    <section id="education" className="py-12 py-md-16">
      <div className="container" style={{ maxWidth: 1080 }}>
        <SectionLabel label="education" />

        <Reveal>
          <div className={styles.eduCard}>
            <div className="d-flex flex-wrap justify-space-between align-center ga-4">
              <div className="d-flex align-center ga-4">
                <Avatar size={46} className={styles.eduIcon}>
                  <Icon icon="mdi-school-outline" color="primary" />
                </Avatar>
                <div>
                  <div className={styles.eduDeg}>{t(education.degree)}</div>
                  <div className={styles.eduUni}>{education.university}</div>
                </div>
              </div>
              <div className="text-md-end">
                <div className={`${styles.eduYr} font-mono`}>{education.period}</div>
                <Chip size="x-small" color="primary" variant="tonal" className="font-mono mt-1">
                  {education.gpa}
                </Chip>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
