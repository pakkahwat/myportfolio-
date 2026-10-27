'use client'

import { skills, techGroups, languages, ui } from '@/lib/resume'
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

        <div className={styles.layout}>
          {/* Core strengths: name + scope + level, no percentage bars */}
          <div>
            <Reveal>
              <h3 className={styles.subhead}>{t(ui.coreStrengths)}</h3>
            </Reveal>
            <ul className={styles.strengths}>
              {skills.map((skill, i) => (
                <Reveal key={i} delay={i * 40}>
                  <li className={styles.strength}>
                    <div>
                      <span className={styles.skillName}>{t(skill.name)}</span>
                      <span className={styles.skillSub}>{t(skill.sub)}</span>
                    </div>
                    <span className={styles.level} data-level={t(skill.level).toLowerCase()}>
                      {t(skill.level)}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <h3 className={styles.subhead}>{t(ui.toolbox)}</h3>
            </Reveal>
            <div className={styles.groups}>
              {techGroups.map((group, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className={styles.group}>
                    <h4 className={styles.groupName}>{t(group.name)}</h4>
                    <ul className="chip-list">
                      {group.items.map((item) => (
                        <li key={item} className="chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className={styles.languages}>
                <h3 className={styles.subhead}>{t(ui.languagesHead)}</h3>
                <ul>
                  {languages.map((lang, li) => (
                    <li key={li} className={styles.lang}>
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
      </div>
    </section>
  )
}
