'use client'

import clsx from 'clsx'
import { Button, Link } from '@nextui-org/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LandingSection from '../components/LandingSection'
import IconScroll from '../../components/icons/icon-scroll'
import InlineHighlighter from '../components/InlineHighlighter'
import IconConfetti from '../../components/icons/icon-confetti'
import IconExternal from '../../components/icons/icon-external'
import WaveSVG from '../components/WaveSVG'

import styles from './Hero.module.scss'

export default function Hero() {
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0],
  )

  return (
    <LandingSection className="relative overflow-hidden">
      <motion.div className="relative flex flex-col w-full h-full items-center justify-center" style={{ opacity }}>
        <header className="text-8xl">
          <div className={clsx('transform-gpu', styles.headerFirstRow)}>
            Your <InlineHighlighter>Crypto</InlineHighlighter>.
          </div>
          <div className={clsx('transform-gpu', styles.headerSecondRow)}>{'>'} Secure It.</div>
        </header>
        <div className={clsx('mt-8 transform-gpu', styles.description)}>
          <p className="text-foreground-600">
            Insure your assets from wallet hacks with <span className="text-primary-500">zero fees</span>, while earning
            premium
            <br />
            on your holdings <span className="text-primary-500">passively</span>. All in the first decentralized savings
            account.
          </p>
          <div className="mt-14 flex justify-center gap-8">
            <Button
              as={Link}
              color="primary"
              href="#"
              variant="shadow"
              size="lg"
              endContent={<IconConfetti className="mb-1" />}
            >
              Join the waitlist
            </Button>
            <Button
              as={Link}
              href="#"
              size="lg"
              variant="ghost"
              className="text-foreground-600"
              endContent={<IconExternal />}
            >
              Ask our Community
            </Button>
          </div>
        </div>
        <div className={`absolute left-0 right-0 bottom-8 flex justify-center transform-gpu ${styles.mouseScroll}`}>
          <IconScroll />
        </div>
      </motion.div>
    </LandingSection>
  )
}
