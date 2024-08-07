import type { PropsWithChildren } from 'react'
import FadeInChildList from '../../../components/fade-in/fade-in-child-list'
import type { ChipProps } from '../../../components/chip/chip'
import { Chip } from '../../../components/chip/chip'
import styles from './offer.module.scss'
import Heading from './components/heading'

interface Props extends PropsWithChildren {
  header: React.ReactNode
}

export default function Features({ children, header }: Props) {
  return (
    <div className={styles.features}>
      <Heading tag="h3">{header}</Heading>
      {children}
    </div>
  )
}

export function FeaturesList({ children }: PropsWithChildren) {
  return (
    <div className={styles.featuresListWrapper}>
      <div className={styles.featuresListContent}>
        <ul className={styles.featuresList}>
          <FadeInChildList>{children}</FadeInChildList>
        </ul>
      </div>
    </div>
  )
}

export function Feature(props: ChipProps) {
  return (
    <li>
      <Chip {...props} />
    </li>
  )
}
