import styles from './CardWithAPY.module.scss'

interface Props {
  apy: string
  children: React.ReactNode
}

export function CardWithAPY({ apy, children }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{children}</div>
      <div className={styles.apy}>{apy}</div>
    </div>
  )
}
