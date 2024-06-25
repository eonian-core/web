import type { PropsWithChildren } from 'react'
import type { PanInfo } from 'framer-motion'
import { motion } from 'framer-motion'
import React from 'react'
import FadeIn from '../../../components/fade-in/fade-in'
import { MOBILE_SCREEN, useIsScreenSmallerOrEqual } from '../../../components/resize-hooks/screens'
import { ClientOnly } from '../../../components/client-only/client-only'
import styles from './offer.module.scss'

const TOKEN_PROP = 'token'
const TOKEN_OFFSET = 20
const TOKEN_SCALE_FACTOR = 0.06
const TOKEN_OPACITY_FACTOR = 0.15

const MAX_OFFSET_TO_SCROLL = 75

function animate(index: number, total: number) {
  return {
    x: index * TOKEN_OFFSET,
    scale: 1 - index * TOKEN_SCALE_FACTOR,
    zIndex: total - index,
    opacity: 1 - index * TOKEN_OPACITY_FACTOR,
  }
}

export default function Tokens({ children }: PropsWithChildren) {
  const isMobile = useIsScreenSmallerOrEqual(MOBILE_SCREEN)

  const defaultItems = React.Children.toArray(children) as React.ReactElement<
    React.PropsWithChildren<{ [TOKEN_PROP]: string }>
  >[]

  const [items, setItems] = React.useState(defaultItems)
  const dragStartXRef = React.useRef(0)

  const moveToEnd = () => {
    const list = [...items]
    const element = list.shift()!
    setItems([...list, element])
  }

  const handlePan = (_event: PointerEvent, info: PanInfo) => {
    const offsetX = Math.abs(info.offset.x)
    dragStartXRef.current = Math.max(dragStartXRef.current, offsetX)
  }

  const handleDragEnd = (_event: MouseEvent) => {
    if (dragStartXRef.current > MAX_OFFSET_TO_SCROLL)
      moveToEnd()

    dragStartXRef.current = 0
  }

  const transformedChildren = items.map((child, index) => {
    const token = child.props[TOKEN_PROP]
    const canDrag = isMobile && index === 0
    return (
      <motion.div
        key={token}
        drag={canDrag ? 'x' : false}
        animate={isMobile ? animate(index, items.length) : undefined}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        onPan={handlePan}
      >
        {child}
      </motion.div>
    )
  })

  return (
    <ClientOnly>
      <FadeIn className={styles.tokens} amount={0.1}>
        {transformedChildren}
      </FadeIn>
    </ClientOnly>
  )
}
