import type { PropsWithChildren } from 'react'
import styles from './awards.module.scss'

export function Awards({ children }: PropsWithChildren) {
  return (
        <div className={styles.container}>
            {children}
        </div>
  )
}
