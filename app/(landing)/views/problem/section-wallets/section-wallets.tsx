import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'
import { Heading, StickyContainer } from '../components/sticky-container'
import InfoCard from '../../lost-funds/InfoCard'
import { useIsMobileOrSmaller } from '../../../../components/resize-hooks/screens'
import { Column } from '../components/column'
import { ScrollItem } from '../components/scroll-item'
import styles from './section-wallet.module.scss'
import { useSwitchOnScroll } from '../components/use-hide-on-scroll'
import clsx from 'clsx'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionWallets({ scrollYProgress }: Props) {
  const isMobile = useIsMobileOrSmaller()

  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.2], [100, 0])
  
  const cardStackProgress = useTransform(scrollYProgress, [0.2, 1.0], [0.0, 1.0])

  const {isVisible: animateLost} = useSwitchOnScroll(scrollYProgress, 0.5, false)

  return (
    <StickyContainer style={{ opacity, translateY }}>
      <Column>
        <Heading>
          <h2>
            Were crypto wallets hacked? <br />
            <mark>Yes.</mark> Pretty Often.
          </h2>

          <p>
            Wallets are great. They cannot lock your funds. <br /> 
            But they rarely return your money when hacked.
          </p>
        </Heading>
      </Column>

      <Column >
        <ScrollItem
          progress={cardStackProgress}
          className="!relative"
          opacity={{ from: [0, 0.4, 1], to: [1, 0.8, 0] }}
          scale={{ from: [0, 0.5, 1], to: [1, 0.8, 0.6] }}
          translateY={{ from: [0, 0.5, 1], to: [0, -30, -60] }}
        >
          <InfoCard href="/" color={0}>
            <h3>$100M+</h3>
            <p>Crypto stolen from wallets through different hacks</p>
          </InfoCard>
        </ScrollItem>

        <ScrollItem
          progress={cardStackProgress}
          className="!absolute"
          translateY={{ from: [0, 1], to: [300, 0] }}
        >
          <InfoCard href="/" color={1} className={clsx({
            [styles.animateBackground]: !animateLost
          })}>
            <h3 className={styles.lostHeader}>0.1
              <div className={clsx(styles.cardHeader, {
                  [styles.scrolled]: !animateLost
                })}>
                <span>
                  8<br />
                  7
                </span>
              </div>%</h3>
            <p>Part of lost assets that crypto wallet providers returned after hacks</p>
          </InfoCard>
        </ScrollItem>
      </Column>
    </StickyContainer>
  )
}
