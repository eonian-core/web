import { motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import Caption from './Caption'
import Features from './Features'

export default function Offer() {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <motion.section
      ref={targetRef}
      style={{ opacity }}
      className="w-full min-h-screen flex flex-col gap-10 max-w-[var(--max-width)] px-10"
    >
      <Caption />
      <Features />
    </motion.section>
  )
}
