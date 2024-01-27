import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'
import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import { Heading, StickyContainer } from '../components/sticky-container'
import InfoCard from '../../lost-funds/InfoCard'
import type { InfoCardProps } from '../../lost-funds/InfoCard'
import { useIsTabletOrSmaller } from '../../../../components/resize-hooks/screens'
import { ScrollItem } from '../components/scroll-item'
import { useSwitchOnScroll } from '../components/use-hide-on-scroll'
import { useScrollContext } from '../problem'
import { AppearMarkProvider } from '../../../../components/appear-mark/appear-mark'
import styles from './section-wallet.module.scss'

interface WalletScrollContextState {
  scroll: MotionValue<number>
  cardStack: MotionValue<number>
  animateLost: boolean
}

export const WalletScrollContext = createContext<Partial<WalletScrollContextState>>({})
export const useWalletScrollContext = () => useContext(WalletScrollContext) as WalletScrollContextState

export default function SectionWallets({ children }: PropsWithChildren) {
  const { wallet: scrollYProgress } = useScrollContext()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.2], [100, 0])
  const cardStackProgress = useTransform(scrollYProgress, [0.2, 1.0], [0.0, 1.0])

  const { isVisible: animateLost } = useSwitchOnScroll(scrollYProgress, 1, false)

  return (
    <StickyContainer style={{ opacity, translateY }}>
      <WalletScrollContext.Provider value={{
        scroll: scrollYProgress,
        cardStack: cardStackProgress,
        animateLost,
      }}>
        {children}
      </WalletScrollContext.Provider>
    </StickyContainer>
  )
}

export function WalletHeader({ children }: PropsWithChildren) {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack, scroll } = useWalletScrollContext()

  const { isVisible: animateMark } = useSwitchOnScroll(scroll, 0.1, true)

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
      progress={cardStack}
      className="!relative"
    >
      <Heading>
        <AppearMarkProvider isVisible={!animateMark}>
          {children}
        </AppearMarkProvider>
      </Heading>
    </ScrollItem>
  )
}

export function WalletFirstCard({ children, color = 0, ...props }: InfoCardProps) {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack: cardStackProgress } = useWalletScrollContext()

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
      opacity={{ from: [0, 0.4, 1], to: [1, 0.8, 0] }}
      scale={{ from: [0, 0.5, 1], to: [1, 0.8, 0.6] }}
      translateY={{ from: [0, 0.5, 1], to: [0, -30, -60] }}
    >
      <InfoCard color={color} {...props}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export function WalletSecondCard({ children, color = 1, className, ...props }: InfoCardProps) {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack: cardStackProgress, animateLost } = useWalletScrollContext()

  if (isTablet) {
    return (
      <ScrollItem
        progress={cardStackProgress}
        className="!absolute"
        translateY={{ from: [0, 0.5, 1], to: [600, 300, 0] }}
      >
        <InfoCard color={color} {...props} className={clsx(className, {
          [styles.animateBackground]: !animateLost,
        })}>
          {children}
        </InfoCard>
      </ScrollItem>
    )
  }

  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!absolute"
      translateY={{ from: [0, 1], to: [300, 0] }}
    >
      <InfoCard color={color} {...props} className={clsx(className, {
        [styles.animateBackground]: !animateLost,
      })}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export function WalletSecondCardHeader({ children }: PropsWithChildren) {
  return (
    <h3 className={styles.lostHeader}>{children}</h3>
  )
}

export function WalletScrolledHeader({ children }: PropsWithChildren) {
  const { animateLost } = useWalletScrollContext()

  return (
    <div className={clsx(styles.cardHeader, {
      [styles.scrolled]: !animateLost,
    })}>
      <span>
        {children}
      </span>
    </div>
  )
}
