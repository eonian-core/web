import clsx from 'clsx'
import styles from './Stat.module.scss'

interface StatProps {
  label: string
  value: React.ReactNode
  big?: boolean
}

export function Stat({ label, value, big }: StatProps) {
  return (
    <div className={clsx(styles.container, { [styles.big]: big })}>
      <div className={clsx(styles.label)}>{label}</div>
      <div className={clsx(styles.value)}>{value}</div>
    </div>
  )
}
