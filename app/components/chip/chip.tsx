import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import styles from './chip.module.scss'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ChipProps extends PropsWithChildren<{}> {
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'bordered'
  size?: 'small' | 'medium'
  className?: string
}

export function Chip({ children, icon, variant = 'primary', size = 'medium', className }: ChipProps) {
  return (
    <span className={clsx(styles.chip, styles[variant], styles[size], className)}>
        {icon}
        {children}
    </span>
  )
}
