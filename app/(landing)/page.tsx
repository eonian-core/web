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
import IconPalmTree from '../components/icons/icon-paml-tree'
import IconShieldHeart from '../components/icons/icon-shield-heart'
import IconChartLine from '../components/icons/icon-chart-line'
import IconHeart from '../components/icons/icon-heart'
import IconIncognito from '../components/icons/icon-incognito'
import IconKey from '../components/icons/icon-key'
import IconLink from '../components/icons/icon-link'
import IconMicroscopeFill from '../components/icons/icon-microscope-fill'
import IconRacingHelmet from '../components/icons/icon-racing-helmet'
import IconRocketOutline from '../components/icons/icon-rocket-outline'
import IconToggleSwitch from '../components/icons/icon-toggle-switch'
import IconVault from '../components/icons/icon-vault'
import IconWallet from '../components/icons/icon-wallet'
import IconWindowGrid from '../components/icons/icon-window-grid'

import { AppearMark, AppearMarkOnScroll } from '../components/appear-mark/appear-mark'
import HeroButton from './views/hero/button-group/hero-button'
import HeroButtonGroup from './views/hero/button-group/hero-button-group'
import Hero from './views/hero/hero'
import InDevelopment from './views/in-development/in-development'
import Founders from './views/founders/founders'
import FoundersList from './views/founders/founders-list'
import Founder from './views/founders/founder'
import { MainButton } from './views/hero/main-button'
import HeroCaptionText from './views/hero/button-group/hero-caption-text'
import Problem from './views/problem/problem'
import Offer from './views/offer/offer'
import Tokens from './views/offer/tokens'
import Caption from './views/offer/caption'
import Features, { Feature, FeaturesList } from './views/offer/features'
import SectionCEX, { CexFirstCard, CexHeader, CexHeaderBut, CexSecondCard, CexSecondCardHeader, ScrollingCexHeader } from './views/problem/section-cex/section-cex'
import SectionWallets, { WalletFirstCard, WalletHeader, WalletScrolledHeader, WalletSecondCard, WalletSecondCardHeader } from './views/problem/section-wallets/section-wallets'
import { Column } from './views/problem/components/column'
import styles from './page.module.css'
import Content from './content/en.mdx'
import {
  Distribution,
  Tag,
  Tags,
  Token,
  TokenApy,
  TokenFees,
  TokenGrowth,
  TokenHeader,
  TokenStats,
  YearlyReturns,
} from './views/offer/token'
import Warning from './views/hero/warning'

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
  Problem,
  SectionCEX,
  ScrollingCexHeader,
  Column,
  CexHeader,
  CexHeaderBut,
  CexFirstCard,
  CexSecondCard,
  CexSecondCardHeader,
  SectionWallets,
  WalletHeader,
  WalletFirstCard,
  WalletSecondCard,
  WalletSecondCardHeader,
  WalletScrolledHeader,
  Feature,
  FeaturesList,
  Offer,
  Tokens,
  Token,
  TokenHeader,
  Tags,
  Tag,
  TokenStats,
  YearlyReturns,
  Distribution,
  TokenFees,
  TokenApy,
  TokenGrowth,
  IconShieldHeart,
  IconPalmTree,
  Caption,
  Features,
  IconVault,
  IconWindowGrid,
  IconMicroscopeFill,
  IconRacingHelmet,
  IconChartLine,
  IconKey,
  IconRocketOutline,
  IconToggleSwitch,
  IconIncognito,
  IconLink,
  IconHeart,
  IconWallet,
  Warning,
  AppearMarkOnScroll,
  AppearMark,
  Warning,
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
