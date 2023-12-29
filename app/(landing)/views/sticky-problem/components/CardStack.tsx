import type { HTMLMotionProps, MotionValue } from 'framer-motion'
import { motion, useTransform } from 'framer-motion'
import React from 'react'

interface Props extends HTMLMotionProps<'div'> {
  progress: MotionValue<number>
}

const ITEM_OPACITY = [[0, 0.2, 0.8, 1], [0, 1, 1, 0]]
const ITEM_TRANSLATE_Y = [[0, 0.2, 0.8, 1], [100, 0, 0, -300]]

const CardStack = React.forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({ children, progress, style }, ref) => {
  const total = React.Children.count(children)

  const items = React.Children.map(children, (element, index) => {
    return <Item total={total} index={index} progress={progress}>{element}</Item>
  })

  return (
    <motion.div ref={ref} layout style={style} className="relative">
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

function Item({ children, progress, index, total }: React.PropsWithChildren<ItemProps>) {
  const [opacityInput, opacityOutput] = ITEM_OPACITY
  const opacity = useTransform(progress, transformInputRange(opacityInput, index, total), opacityOutput)

  const [translateYInput, translateYOutput] = ITEM_TRANSLATE_Y
  const translateY = useTransform(progress, transformInputRange(translateYInput, index, total), translateYOutput)

  return (
    <motion.div style={{ opacity, translateY }} className={`${index === 0 ? '!relative' : '!absolute'} top-0 left-0 w-full h-full`}>
      {children}
    </motion.div>
  )
}

function transformInputRange(range: number[], index: number, total: number): number[] {
  return range.map((value) => {
    const offset = range[range.length - 1] / total
    return (value / total) + (offset * index)
  })
}
