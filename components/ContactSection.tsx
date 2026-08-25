'use client'

import type { Contact } from '@/lib/resume'
import { contacts, profile, ui } from '@/lib/resume'
import { useT, type Localized } from '@/lib/useT'
import { useReveal } from '@/lib/directives'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import { Icon } from './ui'
import styles from './ContactSection.module.css'

function ContactLink({ c, index, t }: { c: Contact; index: number; t: (v: Localized) => string }) {
  const ref = useReveal<HTMLAnchorElement>(index * 70)
  return (
    <a ref={ref} href={c.href} target="_blank" rel="noopener" className={styles.contactLink}>
      <Icon icon={c.icon} color="primary" size={20} className="mr-3" />
      <div className="d-flex flex-column">
        <span className={`${styles.contactLabel} font-mono`}>{t(c.label)}</span>
        <span className={styles.contactValue}>{c.value}</span>
      </div>
      <Icon icon="mdi-arrow-top-right" size={16} className={styles.contactArrow} />
    </a>
  )
}

export default function ContactSection() {
  const { t } = useT()
  const year = new Date().getFullYear()

  return (
    <section id="contact" className={`${styles.contact} grid-bg`}>
      <div className="container py-12 py-md-16" style={{ maxWidth: 1080 }}>
        <SectionLabel label="get_in_touch" />

        <div className="row align-center">
          <div className="col col-12 col-md-7">
            <Reveal>
              <p className={`font-mono prompt ${styles.contactPrompt} mb-2`}>echo $STATUS</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className={`${styles.contactHead} mb-4`}>
                {t(ui.contactHead1)} <span className={styles.textAmber}>production-critical</span>{' '}
                {t(ui.contactHead2)}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className={styles.contactSub}>{t(ui.contactSub)}</p>
            </Reveal>
          </div>

          <div className="col col-12 col-md-5">
            <div className="d-flex flex-column ga-3">
              {contacts.map((c, i) => (
                <ContactLink key={i} c={c} index={i} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={styles.footInner}>
          <span className={`font-mono ${styles.footText}`}>
            <span className={styles.textAmber}>{'{'}</span>
            {profile.initials}
            <span className={styles.textAmber}>{'}'}</span> · {t(profile.name)}
          </span>
          <a className={`font-mono ${styles.footText} ${styles.footMail}`} href={`mailto:${profile.email}`}>
            <Icon icon="mdi-email-outline" size={13} className="mr-1" />
            {profile.email}
          </a>
          <span className={`font-mono ${styles.footText}`}>built with Next.js · © {year}</span>
        </div>
      </footer>
    </section>
  )
}
