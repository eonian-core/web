import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent, useTransform } from 'framer-motion'
import { Heading, StickyContainer } from '../components/sticky-container'
import InfoCard from '../../lost-funds/InfoCard'
import { useIsMobileOrSmaller } from '../../../../components/resize-hooks/screens'
import { Column } from '../components/column'
import { ScrollItem } from '../components/scroll-item'
import styles from './section-wallet.module.scss'
import { useSwitchOnScroll } from '../components/use-hide-on-scroll'
import clsx from 'clsx'
import { PropsWithChildren, createContext, useContext } from 'react'
import { useScrollContext } from '../problem'

interface WalletScrollContextState {
  cardStack: MotionValue<number>;
  animateLost: boolean;
}

export const WalletScrollContext = createContext<Partial<WalletScrollContextState>>({});
export const useWalletScrollContext = () => useContext(WalletScrollContext) as WalletScrollContextState

export default function SectionWallets({ children }: PropsWithChildren) {
  const isMobile = useIsMobileOrSmaller()

  const { scroll: scrollYProgress } = useScrollContext()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  const cardStackProgress = useTransform(scrollYProgress, [0.2, 1.0], [0.0, 1.0])

  const { isVisible: animateLost } = useSwitchOnScroll(scrollYProgress, 1, false)

  return (
    <StickyContainer style={{ opacity, translateY }}>
      <WalletScrollContext.Provider value={{
        cardStack: cardStackProgress,
        animateLost,
      }}>
        {children}
      </WalletScrollContext.Provider>
    </StickyContainer>
  )
}

export const WalletHeader = ({ children }: PropsWithChildren) => (
  <Heading>{children}</Heading>
)

export const WalletFirstCard = ({ children }: PropsWithChildren) => {
  const { cardStack: cardStackProgress } = useWalletScrollContext()
  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!relative"
      opacity={{ from: [0, 0.4, 1], to: [1, 0.8, 0] }}
      scale={{ from: [0, 0.5, 1], to: [1, 0.8, 0.6] }}
      translateY={{ from: [0, 0.5, 1], to: [0, -30, -60] }}
    >
      <InfoCard href="/" color={0}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export const WalletSecondCard = ({ children }: PropsWithChildren) => {
  const { cardStack: cardStackProgress, animateLost } = useWalletScrollContext()

  return (
    <ScrollItem
      progress={cardStackProgress}
      className="!absolute"
      translateY={{ from: [0, 1], to: [300, 0] }}
    >
      <InfoCard href="/" color={1} className={clsx({
        [styles.animateBackground]: !animateLost
      })}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}

export const WalletSecondCardHeader = ({ children }: PropsWithChildren) => {
  return (
    <h3 className={styles.lostHeader}>{children}</h3>
  )
}

export const WalletScrolledHeader = ({ children }: PropsWithChildren) => {
  const { animateLost } = useWalletScrollContext()

  return (
    <div className={clsx(styles.cardHeader, {
      [styles.scrolled]: !animateLost
    })}>
      <span>
        {children}
      </span>
    </div>
  )
}