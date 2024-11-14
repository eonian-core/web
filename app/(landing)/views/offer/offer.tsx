import type { PropsWithChildren } from 'react'
import React from 'react'
import FadeInList from '../../../components/fade-in/fade-in-list'
import styles from './offer.module.scss'

export default function Offer({ children }: PropsWithChildren) {
  return (
    <FadeInList className={styles.container} amount={0.3} event={{ 'Component Name': 'Offer' }}>
      {children}
    </FadeInList>
  )
}
