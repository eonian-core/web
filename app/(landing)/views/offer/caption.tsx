import type { PropsWithChildren } from 'react'
import styles from './offer.module.scss'
import Heading from './components/heading'

interface CaptionProps extends PropsWithChildren {
  header?: React.ReactNode
}

export default function Caption({ header, children }: CaptionProps) {
  return (
    <div className={styles.caption}>
      <Heading tag="h2">{header}</Heading>
      {children}
    </div>
  )
}
