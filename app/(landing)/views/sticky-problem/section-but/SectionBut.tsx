import { LayoutGroup, type MotionValue, motion, useTransform } from 'framer-motion'
import { H2 } from '../../../../components/heading/heading'
import { interFont } from '../../../../shared/fonts/Inter'
import { StickyContainer } from '../components/StickyContainer'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionBut({ scrollYProgress }: Props) {
  const mainOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const butOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const butWidth = useTransform(scrollYProgress, [0.3, 0.4], [0, 92])

  return (
    <StickyContainer>
      <motion.h2
        className={`${interFont.className} text-4xl font-bold flex gap-1.5`}
        style={{ opacity: mainOpacity }}
      >
        <span>On the other hand, you can use crypto wallets...</span>
        <motion.span style={{ opacity: butOpacity, width: butWidth }}>
          <H2 className="!m-0 !text-4xl">but...</H2>
        </motion.span>
      </motion.h2>
    </StickyContainer>
  )
}
