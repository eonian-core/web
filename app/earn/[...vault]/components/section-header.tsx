import type { PropsWithChildren } from 'react'
import styles from './section-header.module.scss'

interface Props {
  title: string
}
export function SectionHeader({ title, children }: PropsWithChildren<Props>) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export function SectionSubHeader({ children }: PropsWithChildren) {
  return <h3 className={styles.subHeader}>{children}</h3>
}
