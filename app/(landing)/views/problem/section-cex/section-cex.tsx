import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import InfoCard from '../../lost-funds/InfoCard'
import { Heading, StickyContainer } from '../components/sticky-container'
import { useIsMobileOrSmaller } from '../../../../components/resize-hooks/screens'

import { Column } from '../components/column'
import { ScrollItem } from '../components/scroll-item'
import { useHideOnScroll } from '../components/use-hide-on-scroll'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionCEX({ scrollYProgress }: Props) {
  const isMobile = useIsMobileOrSmaller()

  const cardStackProgress = useTransform(scrollYProgress, [0, 0.4], [0.0, 1.0])
  const headingProgress = useTransform(scrollYProgress, [0.4, 0.8], [0.0, 1.0])

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1.0], [1, 1, 0])
  const translateY = useTransform(scrollYProgress, [0, 0.8, 1.0], [0, 0, -100])

  const {isVisible} = useHideOnScroll(scrollYProgress)

  return (
    <StickyContainer style={{display: isVisible ? 'block' : 'none', opacity, translateY}} >
      <Column>
        <ScrollItem
          progress={headingProgress}
          className="!relative"
          translateY={{ from: [0, 0.8, 1], to: [0, -400, -400] }}
        >
          <Heading>
            <h2>
              Where’s Your Money <br /> If <mark>Binance</mark> Goes Bankrupt?
            </h2>

            <p>
              Crypto Exchanges are great. They sometimes return the money when hacked,
              but they also can lock you up, go bankrupt or out of the country.
            </p>
          </Heading>
        </ScrollItem>

        <ScrollItem
          progress={headingProgress}
          className="!absolute"
          opacity={{ from: [0, 0.2, 0.8, 1], to: [0, 1, 1, 1] }}
          translateY={{ from: [0, 0.8, 1], to: [400, 0, 0] }}
        >
          <Heading>
            <h2 >
              On the other hand, you can use crypto wallets, <mark>but...</mark>
            </h2>
          </Heading>
        </ScrollItem>
      </Column>

      <Column >
        <ScrollItem
          progress={cardStackProgress}
          className="!relative"
          opacity={{ from: [0, 0.2, 0.5, 1], to: [1, 0.8, 0, 0] }}
          scale={{ from: [0, 0.3, 0.8, 1], to: [1, 0.8, 0.6, 0.6] }}
          translateY={{ from: [0, 0.3, 0.8, 1], to: [0, -30, -60, -60] }}
        >
          <InfoCard href="/" color={0} className="h-full">
            <h3>$8.9B+</h3>
            <p>Lost digital assets due <br />Crypto Exchanges bankruptcies</p>
          </InfoCard>
        </ScrollItem>

        <ScrollItem
          progress={cardStackProgress}
          className="!absolute"
          opacity={{ from: [0, 0.2, 0.8, 1], to: [0, 1, 1, 1] }}
          scale={{ from: [0, 0.3, 0.8, 1], to: [1, 1, 1, 1] }}
          translateY={{ from: [0, 0.5, 0.8, 1], to: [300, 0, 0, 0] }}
        >
          <InfoCard href="/" color={1} className="h-full">
            <h3>5</h3>
            <p>Crypto Exchanges exited US</p>
          </InfoCard>
        </ScrollItem>

      </Column>
    </StickyContainer>
  )
}
