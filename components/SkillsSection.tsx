'use client'

// Hold the skill bars at 0 until the column scrolls into view, then let them
// sweep up to their real values (the progress bar tweens the width itself).
import { useEffect, useRef, useState } from 'react'
import { skills, techStack, languages } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import { Chip, ProgressLinear } from './ui'
import styles from './SkillsSection.module.css'

export default function SkillsSection() {
  const { t } = useT()
  const skillsColRef = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFilled(true)
      return
    }
    const node = skillsColRef.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setFilled(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills" className={`py-12 py-md-16 ${styles.skillsBand}`}>
      <div className="container" style={{ maxWidth: 1080 }}>
        <SectionLabel label="skills" />

        <div className="row">
          {/* Core skills with bars */}
          <div ref={skillsColRef} className="col col-12 col-md-6">
            <Reveal>
              <div className={`${styles.blockLabel} font-mono mb-5`}>core_skills</div>
            </Reveal>

            {skills.map((skill, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="mb-5">
                  <div className="d-flex justify-space-between align-end mb-2">
                    <div>
                      <span className={styles.skillName}>{t(skill.name)}</span>
                      <span className={`${styles.skillSub} font-mono`}>{t(skill.sub)}</span>
                    </div>
                    <span className={`${styles.skillLvl} font-mono`}>{t(skill.level)}</span>
                  </div>
                  <ProgressLinear
                    value={filled ? skill.value : 0}
                    height={4}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tech stack + languages */}
          <div className="col col-12 col-md-6">
            <Reveal>
              <div className={`${styles.blockLabel} font-mono mb-5`}>tech_stack</div>
            </Reveal>
            <Reveal delay={80}>
              <div className="d-flex flex-wrap ga-2 mb-10">
                {techStack.map((tech) => (
                  <Chip key={tech} size="small" variant="outlined" className={`font-mono ${styles.techChip}`}>
                    {tech}
                  </Chip>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className={`${styles.blockLabel} font-mono mb-5`}>languages</div>
            </Reveal>
            {languages.map((lang, li) => (
              <Reveal key={li} delay={60}>
                <div className="d-flex justify-space-between align-center mb-3">
                  <span className={styles.langName}>{t(lang.name)}</span>
                  <div className="d-flex ga-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`${styles.langDot} ${n <= lang.level ? styles.langDotOn : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
