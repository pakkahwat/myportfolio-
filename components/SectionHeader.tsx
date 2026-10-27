'use client'

import { sections } from '@/lib/resume'
import { useT } from '@/lib/useT'
import Reveal from './Reveal'
import styles from './SectionHeader.module.css'

// "01  Selected work" + optional lead line, shared by every section.
export default function SectionHeader({ id }: { id: keyof typeof sections }) {
  const { t } = useT()
  const s = sections[id]
  const lead = 'lead' in s ? s.lead : undefined

  return (
    <Reveal>
      <header className={styles.head}>
        <span className={`${styles.index} mono`} aria-hidden="true">
          <span className="grad-text">{s.n}</span>
        </span>
        <h2 id={`${id}-title`} className={styles.title}>
          {t(s.title)}
        </h2>
        {lead && <p className={styles.lead}>{t(lead)}</p>}
      </header>
    </Reveal>
  )
}
