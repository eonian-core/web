import type { PropsWithChildren } from 'react'
import FadeInChildList from '../../../components/fade-in/fade-in-child-list'
import styles from './offer.module.scss'
import type { ChipProps } from './chip'
import { Chip } from './chip'

export default function Features({ children }: PropsWithChildren) {
  return (
    <div className={styles.features}>
      {children}
    </div>
  )
}

export function FeaturesList({ children }: PropsWithChildren) {
  return <ul className={styles.featuresList}>
    <FadeInChildList>
      {children}
    </FadeInChildList>
  </ul>
}

export function Feature(props: ChipProps) {
  return <li>
    <Chip {...props} />
  </li>
}
