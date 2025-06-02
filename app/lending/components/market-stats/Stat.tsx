import clsx from 'clsx'
import styles from './Stat.module.scss'

interface StatProps {
  children: string
  value: React.ReactNode
  big?: boolean
  className?: string
}

export function Stat({ children, value, big, className }: StatProps) {
  return (
    <div className={clsx(styles.container, { [styles.big]: big }, className)}>
      <div className={clsx(styles.label)}>{children}</div>
      <div className={clsx(styles.value)}>{value}</div>
    </div>
  )
}
