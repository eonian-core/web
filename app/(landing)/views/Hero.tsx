import clsx from 'clsx'
import { Button, Link } from '@nextui-org/react'
import LandingSection from '../components/LandingSection'
import IconScroll from '../../components/icons/icon-scroll'
import InlineHighlighter from '../components/InlineHighlighter'
import IconConfetti from '../../components/icons/icon-confetti'
import IconExternal from '../../components/icons/icon-external'
import WaveSVG from '../components/WaveSVG'

import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <LandingSection className="relative overflow-hidden">
      <WaveSVG />
      <EdgeShape className="top-0 left-0 w-2/3 -translate-x-1/2 -translate-y-1/2 text-background-700" />
      <EdgeShape className="bottom-0 right-0 w-2/3 translate-x-1/2 translate-y-1/2 text-background-600" />
      <div className="relative flex flex-col w-full h-full items-center justify-center">
        <header className="text-8xl">
          <div className={clsx('transform-gpu', styles.headerFirstRow)}>
            Your <InlineHighlighter>Crypto</InlineHighlighter>.
          </div>
          <div className={clsx('transform-gpu', styles.headerSecondRow)}>
            {'>'} Secure It.
          </div>
        </header>
        <p className={clsx('mt-8 text-foreground-600 transform-gpu', styles.description)}>
          Insure your assets from wallet hacks with <span className="text-primary-500">zero fees</span>, while earning
          premium
          <br />
          on your holdings <span className="text-primary-500">passively</span>. All in the first decentralized savings
          account.
        </p>
        <div className={clsx('mt-14 flex gap-8 transform-gpu', styles.description)}>
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
          <div className="absolute left-0 right-0 bottom-8 flex justify-center"><IconScroll /></div>
      </div>
    </LandingSection>
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
