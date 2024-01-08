'use client'

import { MDXProvider } from '@mdx-js/react'
import { H2, H3 } from '../components/heading/heading'
import IconDiscord from '../components/icons/icon-discord'
import IconExternal from '../components/icons/icon-external'
import IconRobot from '../components/icons/icon-robot'
import IconTwitter from '../components/icons/icon-twitter'
import IconLinkedIn from '../components/icons/icon-linkedin'
import ExternalLink from '../components/links/external-link'
import { LinkInText } from '../components/links/link-in-text'
import Mbr from '../components/mobile-break/mobile-break'
import { Target } from '../components/card/card'
import { WaitList } from '../components/waitlist/waitlist'
import styles from './page.module.css'

import Content from './content/en.mdx'

import HeroButton from './views/hero/button-group/hero-button'
import HeroButtonGroup from './views/hero/button-group/hero-button-group'
import Hero from './views/hero/hero'
import InDevelopment from './views/in-development/in-development'
import Founders from './views/founders/founders'
import FoundersList from './views/founders/founders-list'
import Founder from './views/founders/founder'
import { MainButton } from './views/hero/main-button'
import HeroCaptionText from './views/hero/button-group/hero-caption-text'
import StickyProblem from './views/sticky-problem/StickyProblem'
import Offer from './views/offer/offer'

const components = {
  Hero,
  HeroCaptionText,
  HeroButtonGroup,
  HeroButton,
  Mbr,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  a: LinkInText as any,
  h2: H2,
  h3: H3,
  Founders,
  FoundersList,
  Founder,
  ExternalLink,
  IconLinkedIn,
  IconTwitter,
  IconExternal,
  IconRobot,
  IconDiscord,
  InDevelopment,
  Target,
  WaitList,
  MainButton,
  StickyProblem,
  Offer,
}

export default function Home() {
  return (
    <main className={styles.main}>
      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    </main>
  )
}
