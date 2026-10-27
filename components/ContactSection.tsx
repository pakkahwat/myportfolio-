'use client'

import { contacts, profile, ui, resumeFiles, lastUpdated } from '@/lib/resume'
import { useT } from '@/lib/useT'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { Icon } from './ui'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const { t } = useT()
  const year = new Date().getFullYear()

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader id="contact" />

        <div className={styles.grid}>
          <Reveal>
            <div className={`tile ${styles.cta}`}>
              <p className={styles.head}>{t(ui.contactHead)}</p>
              <p className={styles.sub}>{t(ui.contactSub)}</p>
              <a href={`mailto:${profile.email}`} className={`btn btn-primary ${styles.mailBtn}`}>
                <Icon name="mail" size={18} />
                {profile.email}
              </a>
            </div>
          </Reveal>

          {/* Email already has the big button */}
          {contacts
            .filter((c) => c.icon !== 'mail')
            .map((c, i) => (
              <Reveal key={c.href} delay={60 + i * 50}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className={`tile ${styles.link}`}>
                  <span className={styles.linkIcon}>
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>{t(c.label)}</span>
                    <span className={styles.linkValue}>{c.value}</span>
                  </span>
                  <Icon name="arrowUpRight" size={18} className={styles.arrow} />
                </a>
              </Reveal>
            ))}

          <Reveal delay={160}>
            <div className={`tile ${styles.link}`}>
              <span className={styles.linkIcon}>
                <Icon name="file" size={22} />
              </span>
              <span className={styles.linkText}>
                <span className={styles.linkLabel}>{t(ui.resumeLabel)}</span>
                <span className={styles.linkValue}>{t(ui.resumeMeta)}</span>
              </span>
              <span className={styles.resumeLinks}>
                {resumeFiles.map((f) => (
                  <a key={f.lang} href={f.href} download aria-label={`${t(ui.resumeLabel)} ${f.lang}`}>
                    <Icon name="download" size={14} />
                    {f.lang}
                  </a>
                ))}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={`container ${styles.footInner}`}>
          <span>
            © {year} {t(profile.name)}
          </span>
          <span>
            {t(ui.builtWith)} · {t(ui.updated)} {t(lastUpdated)}
          </span>
        </div>
      </footer>
    </section>
  )
}
