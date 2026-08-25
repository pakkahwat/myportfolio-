'use client'

import { summary, stories } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import { Icon } from './ui'
import styles from './SummarySection.module.css'

export default function SummarySection() {
  const { t } = useT()

  return (
    <section id="summary" className="py-12 py-md-16">
      <div className="container" style={{ maxWidth: 1080 }}>
        <SectionLabel label="summary" />

        <Reveal>
          <p className={`${styles.summaryText} mb-12`}>{t(summary)}</p>
        </Reveal>

        <SectionLabel label="success_stories" />

        <div className="row dense">
          {stories.map((story, i) => (
            <div key={i} className="col col-12 col-md-6">
              <Reveal delay={i * 80}>
                <div className={`${styles.storyCard} h-100`}>
                  <div className="d-flex">
                    <Icon
                      icon="mdi-star-four-points"
                      color="primary"
                      size={18}
                      className="mt-1 mr-3 flex-shrink-0"
                    />
                    <div>
                      <div className={`${styles.storyHead} mb-1`}>{t(story.head)}</div>
                      <div className={styles.storyDesc}>{t(story.desc)}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
