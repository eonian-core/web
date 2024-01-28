import type { HTMLMotionProps, MotionValue } from 'framer-motion'
import { motion, useTransform } from 'framer-motion'
import React from 'react'
import styles from './card-stack.module.scss'

interface Props extends HTMLMotionProps<'div'> {
  progress: MotionValue<number>
}

const CardStack = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({ children, progress, style }, ref) => {
  const total = React.Children.count(children)

  const items = React.Children.map(children, (element, index) => {
    return <Item total={total} index={index} progress={progress}>{element}</Item>
  })

  return (
    <motion.div ref={ref} layout style={style} className={styles.cardStack}>
      {items}
    </motion.div>
  )
})

CardStack.displayName = 'CardStack'

export default CardStack

interface ItemProps {
  index: number
  total: number
  progress: MotionValue<number>
}

function Item({ children, progress, index }: React.PropsWithChildren<ItemProps>) {
  const opacity = useTransform(
    progress,
    !index ? [0, 0.2, 0.5, 1] : [0, 0.2, 0.8, 1],
    !index ? [1, 0.8, 0, 0] : [0, 1, 1, 1],
  )

  const scale = useTransform(
    progress,
    [0, 0.3, 0.8, 1],
    !index ? [1, 0.8, 0.6, 0.6] : [1, 1, 1, 1],
  )

  const translateY = useTransform(
    progress,
    !index ? [0, 0.3, 0.8, 1] : [0, 0.5, 0.8, 1],
    !index ? [0, -30, -60, -60] : [300, 0, 0, 0],
  )

  return (
    <motion.div style={{ opacity, translateY, scale }} className={`${index === 0 ? '!relative' : '!absolute'} top-0 left-0 w-full h-full`}>
      {children}
    </motion.div>
  )
}
