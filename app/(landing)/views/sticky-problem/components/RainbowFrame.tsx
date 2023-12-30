import { motion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

import { ScreenName, useScreenName } from '../../../../components/resize-hooks/screens'
import styles from './RaindowFrame.module.scss'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function RainbowFrame({ scrollYProgress }: Props) {
  const { width: frameWidth, height: frameHeight } = useFrameSize()

  const opacity = useTransform(scrollYProgress, [0.0, 0.1, 0.8, 1], [0, 1, 1, 0])
  const width = useTransform(scrollYProgress, [0.0, 0.15, 0.9, 1], ['10vw', frameWidth, frameWidth, '10vw'])
  const height = useTransform(scrollYProgress, [0.0, 0.15, 0.9, 1], ['15vh', frameHeight, frameHeight, '15vh'])

  return (
    <motion.div
      layout
      style={{ opacity, width, height }}
      className={`${styles.frame} fixed top-1/2 left-1/2 rounded-md -translate-x-1/2 !-translate-y-1/2`}
    />
  )
}

function useFrameSize() {
  const screenName = useScreenName()
  switch (screenName) {
    case ScreenName.SMALL_MOBILE:
    case ScreenName.MOBILE:
    case ScreenName.TABLET:
      return { width: '100vw', height: '100vh' }
    case ScreenName.LAPTOP:
    case ScreenName.DESKTOP:
      return { width: '90vw', height: '90vh' }
    default:
      return { width: '80vw', height: '50vh' }
  }
}
