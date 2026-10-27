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

        <div className={styles.layout}>
          <Reveal>
            <div>
              <p className={styles.head}>{t(ui.contactHead)}</p>
              <p className={styles.sub}>{t(ui.contactSub)}</p>
              <a href={`mailto:${profile.email}`} className={`btn btn-primary ${styles.mailBtn}`}>
                <Icon name="mail" size={18} />
                {profile.email}
              </a>
            </div>
          </Reveal>

          <ul className={styles.links}>
            {/* Email already has the big button on the left */}
            {contacts.filter((c) => c.icon !== 'mail').map((c, i) => (
              <Reveal key={c.href} delay={i * 50}>
                <li>
                  <a
                    href={c.href}
                    target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={styles.row}
                  >
                    <span className={styles.rowIcon}>
                      <Icon name={c.icon} size={20} />
                    </span>
                    <span className={styles.rowText}>
                      <span className={styles.rowLabel}>{t(c.label)}</span>
                      <span className={styles.rowValue}>{c.value}</span>
                    </span>
                    <Icon name="arrowUpRight" size={18} className={styles.rowArrow} />
                  </a>
                </li>
              </Reveal>
            ))}
            <Reveal delay={100}>
              <li className={styles.row}>
                <span className={styles.rowIcon}>
                  <Icon name="file" size={20} />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowLabel}>{t(ui.resumeLabel)}</span>
                  <span className={styles.rowValue}>{t(ui.resumeMeta)}</span>
                </span>
                <span className={styles.resumeLinks}>
                  {resumeFiles.map((f) => (
                    <a key={f.lang} href={f.href} download aria-label={`${t(ui.resumeLabel)} ${f.lang}`}>
                      <Icon name="download" size={14} />
                      {f.lang}
                    </a>
                  ))}
                </span>
              </li>
            </Reveal>
          </ul>
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
