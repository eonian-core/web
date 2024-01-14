import type { PropsWithChildren } from 'react'
import React from 'react'
import FadeInList from '../../../components/fade-in/fade-in-list'
import Container from '../../../components/contrainer/container'
import Caption from './caption'
import Features from './features'
import styles from './offer.module.scss'

export default function Offer({ children }: PropsWithChildren) {
  return (
    <Container className={styles.container}>
      <FadeInList className={styles.innerContainer} amount={0.3}>
        <Caption />

        <Features />

        {children}
      </FadeInList>
    </Container>
  )
}
