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
  const isScrolled = useIsScrolled()

  return (
    <Container>
      <div className={styles.hero}>
        {children}

        <IconScroll className={clsx(styles.scrollIcon, { [styles.hidden]: isScrolled })} />
      </div>
    </Container>
  )
}
