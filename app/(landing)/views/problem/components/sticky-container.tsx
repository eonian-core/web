import React from 'react'
import { LayoutGroup, MotionStyle, motion } from 'framer-motion'
import styles from './sticky-container.module.scss'

interface StickyContainerProps {
  style?: MotionStyle
}

export function StickyContainer({ children, style }: React.PropsWithChildren<StickyContainerProps>) {
  return (
    <motion.div {...{ style }} className={styles.container}>
      <LayoutGroup>
        <motion.div
          layout
          className={styles.content}
        >
          {children}
        </motion.div>
      </LayoutGroup>
    </motion.div>
  )
}

export const Heading = ({ children }: React.PropsWithChildren) => (
  <div className={styles.heading}>{children}</div>
)
