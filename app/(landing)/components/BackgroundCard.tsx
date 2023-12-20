'use client'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import WaveSVG from './WaveSVG'

import styles from './BackgroundCard.module.scss'

export default function BackgroundCard() {
  const { scrollYProgress } = useScroll()

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.5],
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0],
  )

  return (
    <>
        <motion.div className={`fixed w-screen max-w-[100rem] bg-background-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${styles.underlay}`}
        style={{ translateX: '-50%', translateY: '-50%', scale }}></motion.div>
        <motion.div className={`fixed w-screen max-w-[100rem] bg-background-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden ${styles.card}`}
        style={{ translateX: '-50%', translateY: '-50%', scale }}>
            <motion.div style={{ opacity }} className="w-full h-full">
                <WaveSVG />
                <EdgeShape className="top-0 left-0 w-2/3 -translate-x-1/2 -translate-y-1/2 text-background-700" />
                <EdgeShape className="bottom-0 right-0 w-2/3 translate-x-1/2 translate-y-1/2 text-background-600" />
            </motion.div>
        </motion.div>
    </>
  )
}

function EdgeShape({ className }: React.HTMLProps<HTMLOrSVGElement>) {
  return (
      <div className={clsx('absolute w-1/4', className)}>
        <svg
          preserveAspectRatio="none"
          className="animate-[spin_30s_linear_infinite]"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M29,-24.3C35.4,-15.1,36.9,-3.1,34,7C31.1,17.1,23.6,25.4,13.9,30.8C4.2,36.2,-7.8,38.7,-17.6,34.7C-27.4,30.7,-34.9,20.2,-36.5,9.4C-38.1,-1.4,-33.7,-12.4,-26.7,-21.8C-19.6,-31.1,-9.8,-38.8,0.7,-39.4C11.3,-40,22.6,-33.5,29,-24.3Z"
            width="100%"
            height="100%"
            transform="translate(50 50)"
            strokeWidth="0"
            stroke="currentColor"
          ></path>
        </svg>
      </div>
  )
}
