import Heading from '../sticky-problem/components/Heading'
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
import { Chip } from './chip'

const features = [
  { name: 'Save and Forget', icon: <IconVault /> },
  { name: 'Highest Transparency', icon: <IconWindowGrid /> },
  { name: 'Insure from Hacks', icon: <IconShieldHeart /> },
  { name: 'Innovation', icon: <IconMicroscopeFill /> },
  { name: 'Your Backup Plan', icon: <IconRacingHelmet /> },
  { name: 'Grow Long-term', icon: <IconChartLine /> },
  { name: 'Own Your Money', icon: <IconKey /> },
  { name: 'Future of Finance', icon: <IconRocketOutline /> },
  { name: 'Control Protocol', icon: <IconToggleSwitch /> },
  { name: 'Passive Income', icon: <IconPalmTree /> },
  { name: 'Stay Anonymous', icon: <IconIncognito/> },
  { name: 'Decentralized', icon: <IconLink /> },
  { name: 'Easy to Use', icon: <IconHeart/> },
  { name: 'Keep Your Wallet', icon: <IconWallet /> },
]

export default function Features() {
  return (
    <div className="flex flex-col gap-4">
      <Heading tag="h3">Main Features</Heading>

      <ul className={styles.features}>
        <FadeInChildList>
          {features.map(data =>
            <li key={data.name}>
              <Chip icon={data.icon}>{data.name}</Chip>
            </li>,
          )}
        </FadeInChildList>
      </ul>

      <LitepaperLink />
    </div>
  )
}

function LitepaperLink() {
  return (
    <div id="litepaper-link">
      <ExternalLink icon={<IconExternal />} iconAtEnd href={'/'}>
        Learn more in Litepaper
      </ExternalLink>
    </div>
  )
}
