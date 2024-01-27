import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import React from 'react'
import clsx from 'clsx'
import InfoCard from '../../lost-funds/InfoCard'
import type { InfoCardProps } from '../../lost-funds/InfoCard'
import { Heading, StickyContainer } from '../components/sticky-container'
import { useIsTabletOrSmaller } from '../../../../components/resize-hooks/screens'

import { ScrollItem } from '../components/scroll-item'
import { useSwitchOnScroll } from '../components/use-hide-on-scroll'
import { useScrollContext } from '../problem'
import { AppearMarkProvider } from '../../../../components/appear-mark/appear-mark'
import styles from './section-cex.module.scss'

interface CexScrollContextState {
  scroll: MotionValue<number>
  cardStack: MotionValue<number>
  heading: MotionValue<number>
  animateBankrupt: boolean
}

export const CexScrollContext = React.createContext<Partial<CexScrollContextState>>({})
export const useCexScrollContext = () => React.useContext(CexScrollContext) as CexScrollContextState

export default function SectionCEX({ children }: PropsWithChildren) {
  const { cex: scrollYProgress } = useScrollContext()

  const cardStackProgress = useTransform(scrollYProgress, [0, 0.4], [0.0, 1.0])
  const headingProgress = useTransform(scrollYProgress, [0.4, 0.8], [0.0, 1.0])

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1.0], [1, 1, 0])
  const translateY = useTransform(scrollYProgress, [0, 0.8, 1.0], [0, 0, -100])

  const { isVisible } = useSwitchOnScroll(scrollYProgress, 1)

  const isTablet = useIsTabletOrSmaller()
  const { isVisible: animateBankrupt } = useSwitchOnScroll(scrollYProgress, !isTablet ? 0.2 : 0.4, true)

  return (
    <StickyContainer style={{ position: isVisible ? 'static' : 'absolute', opacity, translateY }} >
      <CexScrollContext.Provider value={{
        scroll: scrollYProgress,
        cardStack: cardStackProgress,
        heading: headingProgress,
        animateBankrupt,
      }}>
        {children}
      </CexScrollContext.Provider>
    </StickyContainer>
  )
}

export function CexHeader({ children }: PropsWithChildren) {
  const isTablet = useIsTabletOrSmaller()
  const { heading: headingProgress, cardStack } = useCexScrollContext()

  if (isTablet) {
    return (
      <ScrollItem
        progress={cardStack}
        className="!relative"
        opacity={{ from: [0, 0.5, 0.6, 1], to: [1, 0.5, 0, 0] }}
        scale={{ from: [0, 0.8, 1], to: [1, 0.9, 0.9] }}
        translateY={{ from: [0, 0.8, 1], to: [0, -10, -10] }}
      >
        <Heading>
          {children}
        </Heading>
      </ScrollItem>
    )
  }

  // desktop version
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

export function ScrollingCexHeader({ children }: PropsWithChildren) {
  return <div className={styles.scrollingCex}>
    <span>
      {children}
    </span>
  </div>
}

export function CexHeaderBut({ children }: PropsWithChildren) {
  const isTablet = useIsTabletOrSmaller()
  const { heading: headingProgress, scroll } = useCexScrollContext()

  const { isVisible: animateMark } = useSwitchOnScroll(!isTablet ? headingProgress : scroll, !isTablet ? 0.2 : 0.5, true)

  if (isTablet) {
    return (
      <ScrollItem
        progress={scroll}
        className={clsx('!absolute', styles.cexHeaderBut)}
        opacity={{ from: [0, 0.3, 0.4, 1], to: [0, 0, 1, 1] }}
        translateY={{ from: [0, 0.2, 0.4, 0.5, 0.7], to: [600, 600, 300, 300, 0] }}
      >
        <Heading>
          <AppearMarkProvider isVisible={!animateMark}>
            {children}
          </AppearMarkProvider>
        </Heading>
      </ScrollItem>
    )
  }

  // desktop version
  return (
    <ScrollItem
      progress={headingProgress}
      className={clsx('!absolute', styles.cexHeaderBut)}
      opacity={{ from: [0, 0.2, 0.8, 1], to: [0, 1, 1, 1] }}
      translateY={{ from: [0, 0.8, 1], to: [400, 0, 0] }}
    >
      <Heading>
        <AppearMarkProvider isVisible={!animateMark}>
          {children}
        </AppearMarkProvider>
      </Heading>
    </ScrollItem>
  )
}

export function CexFirstCard({ children, color = 0, ...props }: InfoCardProps) {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack: cardStackProgress } = useCexScrollContext()

  if (isTablet) {
    return (
      <ScrollItem
        progress={cardStackProgress}
        className="!relative"
        opacity={{ from: [0, 0.5, 0.9, 1], to: [1, 1, 0.8, 0] }}
        scale={{ from: [0, 0.5, 1], to: [1, 1, 0.6] }}
        translateY={{ from: [0, 0.5, 1], to: [300, 0, -60] }}
      >
        <InfoCard color={color} {...props}>
          {children}
        </InfoCard>
      </ScrollItem>
    )
  }

  // desktop version
  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!relative"
      opacity={{ from: [0, 0.2, 0.5, 1], to: [1, 0.8, 0, 0] }}
      scale={{ from: [0, 0.3, 0.8, 1], to: [1, 0.8, 0.6, 0.6] }}
      translateY={{ from: [0, 0.3, 0.8, 1], to: [0, -30, -60, -60] }}
    >
      <InfoCard color={color} {...props}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export function CexSecondCard({ children, color = 1, className, ...props }: InfoCardProps) {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack: cardStackProgress, animateBankrupt, scroll } = useCexScrollContext()

  if (isTablet) {
    return (
      <ScrollItem
        progress={scroll}
        className="!absolute"
        opacity={{ from: [0, 0.5, 0.7], to: [1, 1, 0] }}
        translateY={{ from: [0, 0.2, 0.4, 0.5, 0.9], to: [600, 300, 0, 0, -600] }}
      >
        <InfoCard color={color} {...props} className={clsx(className, {
          [styles.animateBackground]: !animateBankrupt,
        })}>
          {children}
        </InfoCard>
      </ScrollItem>
    )
  }

  // desktop version
  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!absolute"
      scale={{ from: [0, 0.3, 0.8, 1], to: [1, 1, 1, 1] }}
      translateY={{ from: [0, 0.5, 0.8, 1], to: [300, 0, 0, 0] }}
    >
      <InfoCard color={color} {...props} className={clsx(className, {
        [styles.animateBackground]: !animateBankrupt,
      })}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export function CexSecondCardHeader({ children }: PropsWithChildren) {
  const { animateBankrupt } = useCexScrollContext()

  return (
    <h3 className={styles.secondCardHeader}>
      <div className={clsx(styles.cardHeader, {
        [styles.scrolled]: !animateBankrupt,
      })}>
        <span>
          {children}
        </span>
      </div>
    </h3>
  )
}
