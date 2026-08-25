'use client'

import type { Project } from '@/lib/resume'
import { projects } from '@/lib/resume'
import { useT, type Localized } from '@/lib/useT'
import { useReveal, useTilt } from '@/lib/directives'
import { mergeRefs } from '@/lib/mergeRefs'
import SectionLabel from './SectionLabel'
import styles from './ProjectsSection.module.css'

function ProjectCard({
  proj,
  index,
  t,
}: {
  proj: Project
  index: number
  t: (v: Localized) => string
}) {
  const revealRef = useReveal<HTMLDivElement>(index * 90)
  const tiltRef = useTilt<HTMLDivElement>(7)

  return (
    <div ref={mergeRefs(revealRef, tiltRef)} className={`${styles.projCard} h-100`}>
      <div className={styles.projName}>{proj.name}</div>
      <div className={styles.projDesc}>{t(proj.desc)}</div>

      <div className="d-flex flex-wrap ga-1 mb-3">
        {proj.tags.map((tag) => (
          <span key={tag} className={`${styles.pt} font-mono`}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.outcome}>
        <span className={`${styles.ol} font-mono`}>// outcome</span>
        <span>{t(proj.outcome)}</span>
      </div>

      {proj.links && proj.links.length > 0 && (
        <div className="d-flex flex-wrap ga-2 mt-3">
          {proj.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.projLink} font-mono`}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectsSection() {
  const { t } = useT()

  return (
    <section id="projects" className={`py-12 py-md-16 ${styles.projectsBand}`}>
      <div className="container" style={{ maxWidth: 1080 }}>
        <SectionLabel label="key_projects" />

        <div className="row">
          {projects.map((proj, i) => (
            <div key={proj.name} className="col col-12 col-md-4">
              <ProjectCard proj={proj} index={i} t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
