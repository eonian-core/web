import type { PropsWithChildren } from 'react'
import React from 'react'
import clsx from 'clsx'
import Container from '../../../components/contrainer/container'
import IconScroll from '../../../components/icons/icon-scroll'
import { useIsScrolled } from '../../../components/parallax/useIsScrolled'
import styles from './hero.module.scss'

export interface HeroProps {
  children: React.ReactNode
}

export default function Hero({ children }: HeroProps) {
  return (
    <div className={styles.containter}>
      <Container>
        <div className={styles.hero}>
          {children}
        </div>
      </Container>
    </div>
  )
}

function HeroBottomSection({ children }: PropsWithChildren) {
  return <div className={styles.bottomSection}>{children}</div>
}

function HeroBottomGlow() {
  const isScrolled = useIsScrolled()
  const classNames = clsx(styles.bottomGlow, { [styles.hidden]: isScrolled })
  return <div className={classNames} />
}

Hero.BottomSection = HeroBottomSection
Hero.BottomGlow = HeroBottomGlow
