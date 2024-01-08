import React from 'react'
import Caption from './caption'
import Features from './features'
import Tokens from './tokens'
import FadeInList from '../../../components/fade-in/fade-in-list'
import styles from './offer.module.scss'

export default function Offer() {

  return (
    <FadeInList className={styles.container} amount={0.3}>
      <Caption />

      <Features />

      <Tokens />
    </FadeInList>
  )
}
