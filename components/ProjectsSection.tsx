'use client'

import type { Ref } from 'react'
import type { Project } from '@/lib/resume'
import { projects, projectGroups, ui } from '@/lib/resume'
import { techKeys } from '@/lib/techIcons'
import { useTechFilter } from '@/lib/TechFilter'
import { useT, type Localized } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { Icon } from './ui'
import styles from './ProjectsSection.module.css'

function Visual({ proj }: { proj: Project }) {
  if (proj.visual?.kind === 'shot') {
    // Browser-framed screenshot; scrolls down on hover like a live page.
    return (
      <div className={styles.shot}>
        <div className={styles.bar} aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="mono">{proj.visual.host}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={proj.visual.src} alt="" loading="lazy" width={960} height={1500} />
      </div>
    )
  }
  if (proj.visual?.kind === 'scan') {
    // Phone reading a (fake) ID card on-device — no real data is shown.
    return (
      <div className={`${styles.art} ${styles.scanArt}`} aria-hidden="true">
        <div className={styles.phone}>
          <div className={styles.idcard}>
            <span className={styles.idFace} />
            <span className={styles.idLines}>
              <i />
              <i />
              <i />
            </span>
          </div>
          <span className={styles.frame} />
          <span className={styles.laser} />
        </div>
      </div>
    )
  }
  return null
}

// `ref` / `data-reveal` arrive from <Reveal> (React 19 passes ref as a prop).
// Filtered results are laid out evenly on the 12-column grid instead of the
// curated bento sizes: 1 → full row, 2 or 4 → halves, otherwise rows of three,
// with any leftover cards sharing the last row equally.
function filteredSpans(n: number): number[] {
  if (n === 1) return [12]
  const cols = n === 2 || n === 4 ? 2 : 3
  const rest = n % cols
  return Array.from({ length: n }, (_, i) => (i < n - rest ? 12 / cols : 12 / rest))
}

function ProjectCard({
  proj,
  t,
  span,
  ref,
  ...rest
}: {
  proj: Project
  t: (v: Localized) => string
  span?: number // set while filtering
  ref?: Ref<HTMLElement>
  'data-reveal'?: string
}) {
  const isLive = proj.group === 'shipped'
  // A lone full-width result with artwork uses the side-by-side "wide" layout.
  const layoutClass =
    span === undefined
      ? proj.layout
        ? styles[proj.layout]
        : styles[proj.group]
      : `${styles[`span${span}`]} ${span === 12 && proj.visual ? styles.wide : ''}`

  return (
    <article
      ref={ref}
      {...rest}
      className={`tile ${styles.card} ${layoutClass}`}
      // Lets the filter's View Transition move each card to its new spot.
      style={{ viewTransitionName: `project-${projects.indexOf(proj)}` }}
    >
      <Visual proj={proj} />

      <div className={styles.body}>
        <div className={styles.top}>
          {proj.icon && (
            <span className={styles.icon} aria-hidden="true">
              <Icon name={proj.icon} size={20} />
            </span>
          )}
          <span className={styles.meta}>{t(proj.meta)}</span>
          {proj.badge && (
            <span className={`${styles.badge} ${isLive ? styles.badgeLive : ''}`}>
              {isLive && <span className="live-dot" aria-hidden="true" />}
              {t(proj.badge)}
            </span>
          )}
        </div>

        <h4 className={styles.name}>{t(proj.name)}</h4>
        <p className={styles.desc}>{t(proj.desc)}</p>

        {proj.highlight && (
          <p className={styles.metric}>
            <span className={`${styles.metricValue} grad-text`}>{proj.highlight.value}</span>
            <span className={styles.metricLabel}>{t(proj.highlight.label)}</span>
          </p>
        )}

        <ul className={`chip-list ${styles.tags}`}>
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
                <Icon name="arrowUpRight" size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const { t } = useT()
  const { tech, setTech } = useTechFilter()
  const key = tech?.toLowerCase() ?? null
  // "Show all" clears the filter and takes you back up to the toolbox to pick
  // another tech (no View Transition here — the page is scrolling away anyway).
  function showAll() {
    setTech(null, { animate: false })
    requestAnimationFrame(() => document.getElementById('toolbox')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  // With a tech picked, only the projects that used it are shown.
  const visible = key ? projects.filter((p) => p.tags.some((tag) => techKeys(tag).includes(key))) : projects

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader id="projects" />

        {tech && (
          <div className={`liquid ${styles.filter}`} role="status">
            <span>
              {t(ui.filterShowing)} <strong>{tech}</strong>
              <span className={styles.filterCount}>{visible.length}</span>
            </span>
            <button type="button" className={styles.clear} onClick={showAll}>
              <Icon name="x" size={14} />
              {t(ui.filterClear)}
            </button>
          </div>
        )}

        {projectGroups.map((group) => {
          const items = visible.filter((p) => p.group === group.id)
          if (items.length === 0) return null
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

              <div className={key ? styles.gridFiltered : styles.grid}>
                {items.map((proj, i) => (
                  <Reveal key={projects.indexOf(proj)} delay={i * 60}>
                    <ProjectCard proj={proj} t={t} span={key ? filteredSpans(items.length)[i] : undefined} />
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
