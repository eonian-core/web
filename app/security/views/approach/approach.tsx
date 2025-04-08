import type { PropsWithChildren } from 'react'
import React from 'react'
import Image from 'next/image'
import Container from '../../../components/contrainer/container'
import FadeInList from '../../../components/fade-in/fade-in-list'
import FadeIn from '../../../components/fade-in/fade-in'
import { useIsLaptopOrSmaller } from '../../../components/resize-hooks/screens'
import shieldPic from './assets/cyber-shield.png'
import styles from './approach.module.scss'

export default function Approach({ children }: PropsWithChildren) {
  return (
    <Container className={styles.pageContainer}>
      {children}
    </Container>
  )
}

export function ApproachBody({ children }: PropsWithChildren) {
  const isLaptopOrSmaller = useIsLaptopOrSmaller()
  return (
    <div className={styles.approach}>
      <FadeIn
        className={styles.imageContainer}
        delay={!isLaptopOrSmaller ? 0.3 : 0.7}
        amount={0.1}
        fadeUpInitial="20%"
      >
        <Image src={shieldPic} alt="cyber shield" placeholder="blur" />
      </FadeIn>

      <FadeInList className={styles.description} delay={0.1} amount={0.1}>
        {children}
      </FadeInList>
    </div>
  )
}

export function ApproachAwards({ children }: PropsWithChildren) {
  const isLaptopOrSmaller = useIsLaptopOrSmaller()

  return (
    <FadeInList
      className={styles.awards}
      delay={!isLaptopOrSmaller ? 0.3 : 0.7}
      amount={0.1}
      >
      {children}
    </FadeInList>
  )
}
