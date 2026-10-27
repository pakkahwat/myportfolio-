'use client'

import type { Project, ProjectGroup } from '@/lib/resume'
import { projects, projectGroups, ui } from '@/lib/resume'
import { useT, type Localized } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { Icon } from './ui'
import styles from './ProjectsSection.module.css'

// Grid per group: live apps three across, company systems two across (their
// tag lists are long), early work three across as compact cards.
const gridClass: Record<ProjectGroup, string> = {
  shipped: styles.grid3,
  work: styles.grid2,
  early: styles.grid3,
}

function ProjectCard({ proj, t }: { proj: Project; t: (v: Localized) => string }) {
  const isLive = proj.group === 'shipped'
  const compact = proj.group === 'early'

  return (
    <article className={`${styles.card} ${compact ? styles.cardCompact : ''}`}>
      <div className={styles.cardTop}>
        <span className={styles.meta}>{t(proj.meta)}</span>
        {proj.badge && (
          <span className={`${styles.badge} ${isLive ? styles.badgeLive : ''}`}>
            {isLive && <span className={styles.liveDot} aria-hidden="true" />}
            {t(proj.badge)}
          </span>
        )}
      </div>

      <h4 className={styles.name}>{t(proj.name)}</h4>
      <p className={styles.desc}>{t(proj.desc)}</p>

      {proj.highlight && (
        <p className={styles.metric}>
          <span className={`${styles.metricValue} mono`}>{proj.highlight.value}</span>
          <span className={styles.metricLabel}>{t(proj.highlight.label)}</span>
        </p>
      )}

      <ul className={`chip-list ${styles.tags}`} aria-label="Tech">
        {proj.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>

      {proj.outcome && (
        <p className={styles.outcome}>
          <span className={styles.outcomeLabel}>{t(ui.outcome)}</span>
          {t(proj.outcome)}
        </p>
      )}

      {proj.links && proj.links.length > 0 && (
        <div className={styles.links}>
          {proj.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <Icon name={link.kind === 'github' ? 'github' : 'globe'} size={16} />
              {link.kind === 'github' ? 'GitHub' : t(ui.liveSite)}
              <Icon name="arrowUpRight" size={14} className={styles.linkArrow} />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function ProjectsSection() {
  const { t } = useT()

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader id="projects" />

        {projectGroups.map((group) => {
          const items = projects.filter((p) => p.group === group.id)
          return (
            <div key={group.id} className={styles.group}>
              <Reveal>
                <div className={styles.groupHead}>
                  <h3 className={styles.groupTitle}>
                    {t(group.label)}
                    <span className={styles.groupCount}>{items.length}</span>
                  </h3>
                  <p className={styles.groupSub}>{t(group.sub)}</p>
                </div>
              </Reveal>

              <div className={gridClass[group.id]}>
                {items.map((proj, i) => (
                  <Reveal key={`${group.id}-${i}`} delay={i * 60}>
                    <div className={styles.cell}>
                      <ProjectCard proj={proj} t={t} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
