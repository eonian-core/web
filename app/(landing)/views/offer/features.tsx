import ExternalLink from '../../../components/links/external-link'
import IconExternal from '../../../components/icons/icon-external'
import FadeInChildList from '../../../components/fade-in/fade-in-child-list'
import IconVault from '../../../components/icons/icon-vault'
import IconWindowGrid from '../../../components/icons/icon-window-grid'
import IconShieldHeart from '../../../components/icons/icon-shield-heart'
import IconMicroscopeFill from '../../../components/icons/icon-microscope-fill'
import IconRacingHelmet from '../../../components/icons/icon-racing-helmet'
import IconChartLine from '../../../components/icons/icon-chart-line'
import IconKey from '../../../components/icons/icon-key'
import IconRocketOutline from '../../../components/icons/icon-rocket-outline'
import IconToggleSwitch from '../../../components/icons/icon-toggle-switch'
import IconPalmTree from '../../../components/icons/icon-paml-tree'
import IconIncognito from '../../../components/icons/icon-incognito'
import IconLink from '../../../components/icons/icon-link'
import IconHeart from '../../../components/icons/icon-heart'
import IconWallet from '../../../components/icons/icon-wallet'
import styles from './offer.module.scss'
import { Chip, ChipProps } from './chip'
import { PropsWithChildren } from 'react'

export default function Features({children}: PropsWithChildren) {
  return (
    <div className={styles.features}>
      {children}
    </div>
  )
}

export const FeaturesList = ({children}: PropsWithChildren) => (
  <ul className={styles.featuresList}>
    <FadeInChildList>
      {children}
    </FadeInChildList>
  </ul>
)

export const Feature = (props: ChipProps) => (
  <li>
    <Chip {...props} />
  </li>
)