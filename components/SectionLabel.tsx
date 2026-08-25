import styles from './SectionLabel.module.css'

export default function SectionLabel({ label }: { label: string }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.marker} />
      <span className={`font-mono ${styles.labelText}`}>{label}</span>
      <span className={styles.rule} />
    </div>
  )
}
