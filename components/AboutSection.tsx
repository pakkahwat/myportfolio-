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

        <div className={styles.layout}>
          <Reveal>
            <p className={styles.summary}>{t(summary)}</p>
          </Reveal>

          <div>
            <Reveal>
              <h3 className={styles.subhead}>{t(ui.highlights)}</h3>
            </Reveal>
            <ol className={styles.stories}>
              {stories.map((story, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className={styles.story}>
                    <span className={`${styles.storyIndex} mono`} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className={styles.storyHead}>{t(story.head)}</h4>
                      <p className={styles.storyDesc}>{t(story.desc)}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
