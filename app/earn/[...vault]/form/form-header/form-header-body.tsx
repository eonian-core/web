import clsx from 'clsx'
import { CardHeader } from '@heroui/react'
import type { PropsWithChildren } from 'react'
import styles from './form-header.module.scss'

/** Minimal logic, will be used in skeleton */
export function FormHeaderBody({ children }: PropsWithChildren) {
  return (
    <CardHeader className={styles.header}>
      {children}
    </CardHeader>
  )
}

interface TabButtonProps {
  currentAction?: string
  action?: string
  children: string
  onClick?: (event: React.MouseEvent) => void
}

export function TabButton({ action, currentAction, children, onClick }: TabButtonProps) {
  return (
    <span
      data-key={action}
      onClick={onClick}
      className={clsx(styles.button, {
        [styles.buttonActive]: currentAction === action,
      })}
        >
      {children}
    </span>
  )
}
