import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './section-header.module.scss'

interface Props {
  title: React.ReactNode
  className?: string
}

export function SectionHeader({ title, className, children }: PropsWithChildren<Props>) {
  const classNames = clsx(styles.container, className)
  return (
    <div className={classNames}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export function SectionSubHeader({ children }: PropsWithChildren) {
  return <h3 className={styles.subHeader}>{children}</h3>
}
