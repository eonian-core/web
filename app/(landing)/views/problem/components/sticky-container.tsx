import React from 'react'
import type { MotionStyle } from 'framer-motion'
import { LayoutGroup, motion } from 'framer-motion'
import styles from './sticky-container.module.scss'

interface StickyContainerProps {
  style?: MotionStyle
}

export function StickyContainer({ children, style }: React.PropsWithChildren<StickyContainerProps>) {
  return (
    <motion.div {...{ style }} className={styles.container}>
      <LayoutGroup>
        <div className={styles.content}>
          {children}
        </div>
      </LayoutGroup>
    </motion.div>
  )
}

export function Heading({ children }: React.PropsWithChildren) {
  return <div className={styles.heading}>{children}</div>
}
