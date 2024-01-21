import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'
import { Heading, StickyContainer } from '../components/sticky-container'
import InfoCard from '../../lost-funds/InfoCard'
import { useIsTabletOrSmaller } from '../../../../components/resize-hooks/screens'
import { ScrollItem } from '../components/scroll-item'
import styles from './section-wallet.module.scss'
import { useSwitchOnScroll } from '../components/use-hide-on-scroll'
import clsx from 'clsx'
import { PropsWithChildren, createContext, useContext } from 'react'
import { useScrollContext } from '../problem'

interface WalletScrollContextState {
  scroll: MotionValue<number>;
  cardStack: MotionValue<number>;
  animateLost: boolean;
}

export const WalletScrollContext = createContext<Partial<WalletScrollContextState>>({});
export const useWalletScrollContext = () => useContext(WalletScrollContext) as WalletScrollContextState

export default function SectionWallets({ children }: PropsWithChildren) {
  const { wallet: scrollYProgress } = useScrollContext()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  const cardStackProgress = useTransform(scrollYProgress, [0.2, 1.0], [0.0, 1.0])

  const isTablet = useIsTabletOrSmaller()
  const { isVisible: animateLost } = useSwitchOnScroll(scrollYProgress, !isTablet ? 1 : 0.8, false)

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

/** offset by 0.2 cardStackProgress at the end (some kind of bug)*/ 
const mobileEndOffset = 0.25

export const WalletHeader = ({ children }: PropsWithChildren) => {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack } = useWalletScrollContext()

  if(isTablet){
    return (
      <ScrollItem
        progress={cardStack}
        className="!relative"
        opacity={{ from: [0, 0.5 - mobileEndOffset, 0.6 - mobileEndOffset, 1 - mobileEndOffset], to: [1, 0.5, 0, 0] }}
        scale={{ from: [0, 0.8 - mobileEndOffset, 1 - mobileEndOffset], to: [1, 0.9, 0.9] }}
        translateY={{ from: [0, 0.8 - mobileEndOffset, 1 - mobileEndOffset], to: [0, -10, -10] }}
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
      progress={cardStack}
      className="!relative"
    >
      <Heading>
        {children}
      </Heading>
    </ScrollItem>
  )
}



export const WalletFirstCard = ({ children }: PropsWithChildren) => {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack: cardStackProgress } = useWalletScrollContext()

  if (isTablet) {
    return (
      <ScrollItem
        progress={cardStackProgress}
        className="!relative"
        opacity={{ from: [0, 0.5 - mobileEndOffset, 0.9 - mobileEndOffset, 1 - mobileEndOffset], to: [1, 1, 0.8, 0] }}
        scale={{ from: [0, 0.5 - mobileEndOffset, 1 - mobileEndOffset], to: [1, 1, 0.6] }}
        translateY={{ from: [0, 0.5 - mobileEndOffset, 1 - mobileEndOffset], to: [300, 0, -60] }}
      >
        <InfoCard href="/" color={0}>
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
      <InfoCard href="/" color={0}>
        {children}
      </InfoCard>
    </ScrollItem>
  )
}



export const WalletSecondCard = ({ children }: PropsWithChildren) => {
  const isTablet = useIsTabletOrSmaller()
  const { cardStack: cardStackProgress, animateLost, scroll } = useWalletScrollContext()

  if (isTablet) {    
    return (
      <ScrollItem
        progress={cardStackProgress}
        className="!absolute"
        translateY={{ from: [0, 0.5 - mobileEndOffset, 1 - mobileEndOffset], to: [600, 300, 0,] }}
      >
        <InfoCard href="/" color={1} className={clsx({
          [styles.animateBackground]: !animateLost
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