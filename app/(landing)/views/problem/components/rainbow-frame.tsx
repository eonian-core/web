import type { PropsWithChildren } from 'react'
import styles from './raindow-frame.module.scss'

export default function RainbowFrame({ children }: PropsWithChildren) {
  return (
    <div
      className={styles.frame}
    ><div className={styles.content}>{children}</div></div>
  )
}
