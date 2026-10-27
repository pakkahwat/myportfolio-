'use client'

// Core strengths + languages. The tech toolbox lives in the hero (Toolbox.tsx),
// where it can drive the project highlight.
import { skills, languages, ui } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import styles from './SkillsSection.module.css'

export default function SkillsSection() {
  const { t } = useT()

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader id="skills" />

        <div className={styles.grid}>
          {skills.map((skill, i) => {
            const level = t(skill.level)
            return (
              <Reveal key={i} delay={(i % 3) * 50}>
                <div className={`tile ${styles.skill}`}>
                  <span className={styles.level} data-level={level.toLowerCase()}>
                    {level}
                  </span>
                  <h3 className={styles.name}>{t(skill.name)}</h3>
                  <p className={styles.sub}>{t(skill.sub)}</p>
                </div>
              </Reveal>
            )
          })}

          <Reveal>
            <div className={`tile ${styles.languages}`}>
              <h3 className={styles.name}>{t(ui.languagesHead)}</h3>
              <ul>
                {languages.map((lang, li) => (
                  <li key={li}>
                    <span>{t(lang.name)}</span>
                    <span className={styles.dots} role="img" aria-label={`${lang.level} / 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={n <= lang.level ? styles.dotOn : styles.dot} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
