import { motion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

import { useIsLaptopOrSmaller } from '../../../../components/resize-hooks/screens'
import styles from './RaindowFrame.module.scss'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function RainbowFrame({ scrollYProgress }: Props) {
  const isMobile = useIsLaptopOrSmaller()

  const maxWidth = isMobile ? '100vw' : '80vw'
  const maxHeight = isMobile ? '100vh' : '50vh'

  const opacity = useTransform(scrollYProgress, [0.0, 0.1, 0.8, 1], [0, 1, 1, 0])
  const width = useTransform(scrollYProgress, [0.0, 0.15, 0.9, 1], ['10vw', maxWidth, maxWidth, '10vw'])
  const height = useTransform(scrollYProgress, [0.0, 0.15, 0.9, 1], ['15vh', maxHeight, maxHeight, '15vh'])

  return (
    <motion.div
      layout
      style={{ opacity, width, height }}
      className={`${styles.frame} fixed top-1/2 left-1/2 rounded-md -translate-x-1/2 !-translate-y-1/2`}
    />
  )
}
