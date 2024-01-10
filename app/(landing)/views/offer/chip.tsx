import clsx from 'clsx'
import styles from './chip.module.scss'
import { PropsWithChildren } from 'react'

export interface ChipProps extends PropsWithChildren<{}> {
    icon?: React.ReactNode
    variant?: "primary" | "secondary" | "bordered" 
    size?: "small" | "medium"
    className?: string
}

export function Chip({ children, icon, variant = "primary", size = 'medium', className }: ChipProps) {
    return (
        <span className={clsx(styles.chip, styles[variant], styles[size], className)}>
            {icon}
            {children}
        </span>
    )
}