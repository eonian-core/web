import styles from './raindow-frame.module.scss'
import { PropsWithChildren } from 'react'


export default function RainbowFrame({children}: PropsWithChildren) {
return (
    <div
      className={styles.frame}
    ><div className={styles.content}>{children}</div></div>
  )
}

