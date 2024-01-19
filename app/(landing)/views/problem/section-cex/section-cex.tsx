import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent, useTransform } from 'framer-motion'
import React, { PropsWithChildren, useRef } from 'react'
import InfoCard from '../../lost-funds/InfoCard'
import { Heading, StickyContainer } from '../components/sticky-container'
import { useIsMobileOrSmaller } from '../../../../components/resize-hooks/screens'

import { Column } from '../components/column'
import { ScrollItem } from '../components/scroll-item'
import { useSwitchOnScroll } from '../components/use-hide-on-scroll'
import styles from './section-cex.module.scss'
import clsx from 'clsx'
import { useScrollContext } from '../problem'


interface CexScrollContextState {
  cardStack: MotionValue<number>;
  heading: MotionValue<number>;
  animateBankrupt: boolean;
}

export const CexScrollContext = React.createContext<Partial<CexScrollContextState>>({ });

export const useCexScrollContext = () => React.useContext(CexScrollContext) as CexScrollContextState

export default function SectionCEX({ children }: PropsWithChildren) {
  const isMobile = useIsMobileOrSmaller()
  const {cex: scrollYProgress} = useScrollContext()

  const cardStackProgress = useTransform(scrollYProgress, [0, 0.4], [0.0, 1.0])
  const headingProgress = useTransform(scrollYProgress, [0.4, 0.8], [0.0, 1.0])

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1.0], [1, 1, 0])
  const translateY = useTransform(scrollYProgress, [0, 0.8, 1.0], [0, 0, -100])

  const {isVisible} = useSwitchOnScroll(scrollYProgress, 1)
  const {isVisible: animateBankrupt} = useSwitchOnScroll(scrollYProgress, 0.2, true)
  
  return (
    <StickyContainer style={{position: isVisible ? 'static' : 'absolute', opacity, translateY}} >
      <CexScrollContext.Provider value={{ 
        cardStack: cardStackProgress,
        heading: headingProgress,
        animateBankrupt,
       }}>
        {children}
      </CexScrollContext.Provider>
    </StickyContainer>
  )
}

export const CexHeader = ({ children }: PropsWithChildren) => {
  const {heading: headingProgress} = useCexScrollContext()
  return (
    <ScrollItem
    progress={headingProgress}
    className="!relative"
    translateY={{ from: [0, 0.8, 1], to: [0, -400, -400] }}
  >
    <Heading>
      {children}
    </Heading>
  </ScrollItem>
  )
}

export const ScrollingCexHeader = ({ children }: PropsWithChildren) => (
  <div className={styles.scrollingCex}>
    <span>
      {children}
    </span>
  </div>
)

export const CexHeaderBut = ({ children }: PropsWithChildren) => {
  const {heading: headingProgress} = useCexScrollContext()
  return (
    <ScrollItem
      progress={headingProgress}
      className="!absolute"
      opacity={{ from: [0, 0.2, 0.8, 1], to: [0, 1, 1, 1] }}
      translateY={{ from: [0, 0.8, 1], to: [400, 0, 0] }}
    >
      <Heading>
        {children}
      </Heading>
    </ScrollItem>
  )
}

export const CexFirstCard = ({ children }: PropsWithChildren) => {
  const {cardStack: cardStackProgress} = useCexScrollContext()
  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!relative"
      opacity={{ from: [0, 0.2, 0.5, 1], to: [1, 0.8, 0, 0] }}
      scale={{ from: [0, 0.3, 0.8, 1], to: [1, 0.8, 0.6, 0.6] }}
      translateY={{ from: [0, 0.3, 0.8, 1], to: [0, -30, -60, -60] }}
    >
      <InfoCard href="/" color={0}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export const CexSecondCard = ({ children }: PropsWithChildren) => {
  const {cardStack: cardStackProgress, animateBankrupt} = useCexScrollContext()
  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!absolute"
      scale={{ from: [0, 0.3, 0.8, 1], to: [1, 1, 1, 1] }}
      translateY={{ from: [0, 0.5, 0.8, 1], to: [300, 0, 0, 0] }}
    >
      <InfoCard href="/" color={1} className={clsx({
        [styles.animateBackground]: !animateBankrupt
      })}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export const CexSecondCardHeader = ({ children }: PropsWithChildren) => {
  const { animateBankrupt} = useCexScrollContext()

  return (
    <h3>
      <div className={clsx(styles.cardHeader, {
        [styles.scrolled]: !animateBankrupt
      })}>
        <span>
          {children}
        </span>
      </div>
    </h3>
  )
}