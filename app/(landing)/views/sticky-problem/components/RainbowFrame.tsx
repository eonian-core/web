import { motion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

import styles from './RaindowFrame.module.scss'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function RainbowFrame({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0.0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const width = useTransform(scrollYProgress, [0.0, 0.2, 0.45, 0.475, 0.55, 0.6, 0.9, 1], ['10vw', '80vw', '80vw', '65vw', '65vw', '80vw', '80vw', '160vw'])
  const height = useTransform(scrollYProgress, [0.0, 0.2, 0.45, 0.475, 0.55, 0.6, 0.9, 1], ['15vh', '50vh', '50vh', '25vh', '25vh', '50vh', '50vh', '100vh'])
  return (
    <motion.div
      layout
      style={{ opacity, width, height }}
      className={`${styles.frame} fixed top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2`}
    />
  )
}
