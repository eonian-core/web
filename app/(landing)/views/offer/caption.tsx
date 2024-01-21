import type { PropsWithChildren } from 'react'
import styles from './offer.module.scss'

interface CaptionProps extends PropsWithChildren {
  header?: React.ReactNode
}

export default function Caption({ header, children }: CaptionProps) {
  return (
    <div className={styles.caption}>
      <h2>{header}</h2>
      {children}
    </div>
  )
}
