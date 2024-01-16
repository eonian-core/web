import { type MotionValue, motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { StickyContainer } from '../components/sticky-container'
import useDimensionTransform from '../../../../shared/hooks/useDimensionTransform'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionBut({ scrollYProgress }: Props) {
  // const mainOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const butRef = useRef(null)
  const butOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const butWidth = useDimensionTransform(butRef, scrollYProgress, [0.3, 0.4], [0, 'width'])

  return (
    <StickyContainer scrollYProgress={scrollYProgress}>
      
    </StickyContainer>
  )
}
