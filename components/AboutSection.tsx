'use client'

import { summary, stories, ui } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  const { t } = useT()

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader id="about" />

        <div className={styles.grid}>
          <Reveal>
            <div className={`tile ${styles.summary}`}>
              <p>{t(summary)}</p>
            </div>
          </Reveal>

          <h3 className="sr-only">{t(ui.highlights)}</h3>
          {stories.map((story, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`tile ${styles.story}`}>
                <span className={`${styles.storyIndex} grad-text`} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className={styles.storyHead}>{t(story.head)}</h4>
                <p className={styles.storyDesc}>{t(story.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
