import { type MotionValue, motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { interFont } from '../../../../shared/fonts/Inter'
import { StickyContainer } from '../components/StickyContainer'
import Heading from '../components/Heading'
import useDimensionTransform from '../../../../shared/hooks/useDimensionTransform'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionBut({ scrollYProgress }: Props) {
  const mainOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const butRef = useRef(null)
  const butOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const butWidth = useDimensionTransform(butRef, scrollYProgress, [0.3, 0.4], [0, 'width'])

  return (
    <StickyContainer scrollYProgress={scrollYProgress}>
      <Heading style={{ opacity: mainOpacity }}>
        On the other hand, you can use crypto wallets...
        <motion.mark ref={butRef} style={{ opacity: butOpacity, width: butWidth, display: 'inline-block' }}>
          &nbsp;but...
        </motion.mark>
      </Heading>
    </StickyContainer>
  )
}
