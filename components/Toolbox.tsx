'use client'

// The toolbox tile: tech grouped by area, each with its logo. Tech that shows
// up in a project is a button — pressing it highlights those projects below
// (shared state in TechFilter) and scrolls to them.
import { useMemo } from 'react'
import { techGroups, projects, ui } from '@/lib/resume'
import { techIcon, techKeys } from '@/lib/techIcons'
import { useTechFilter } from '@/lib/TechFilter'
import { useT } from '@/lib/useT'
import styles from './Toolbox.module.css'

function Logo({ name }: { name: string }) {
  const icon = techIcon(name)
  if (!icon) {
    return (
      <span className={styles.monogram} aria-hidden="true">
        {name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
      </span>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" focusable="false" fill={icon.color}>
      <path d={icon.path} />
    </svg>
  )
}

export default function Toolbox() {
  const { t } = useT()
  const { tech, setTech } = useTechFilter()

  // How many projects list each tech (by normalised name).
  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of projects) {
      const keys = new Set(p.tags.flatMap(techKeys))
      for (const k of keys) map.set(k, (map.get(k) ?? 0) + 1)
    }
    return map
  }, [])

  function pick(name: string) {
    const next = tech === name ? null : name
    setTech(next)
    if (next) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="toolbox" className={styles.toolbox}>
      <div className={styles.head}>
        <h2 className={styles.title}>{t(ui.toolbox)}</h2>
        <p className={styles.hint}>{t(ui.toolboxHint)}</p>
      </div>
      <div className={styles.groups}>
        {techGroups.map((group, gi) => (
          <div key={gi} className={styles.group}>
            <h3 className={styles.groupName}>{t(group.name)}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => {
                const n = counts.get(item.toLowerCase()) ?? 0
                return (
                  <li key={item}>
                    {n > 0 ? (
                      <button
                        type="button"
                        className={`${styles.item} ${styles.itemBtn} ${tech === item ? styles.itemOn : ''}`}
                        aria-pressed={tech === item}
                        onClick={() => pick(item)}
                      >
                        <Logo name={item} />
                        {item}
                        <span className={styles.count}>{n}</span>
                      </button>
                    ) : (
                      <span className={styles.item}>
                        <Logo name={item} />
                        {item}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
