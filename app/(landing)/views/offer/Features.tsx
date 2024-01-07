import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect } from 'react'
import styles from './offer.module.scss'
import Heading from '../sticky-problem/components/Heading'
import IconLinkedin from '../../../components/icons/icon-linkedin'
import ExternalLink from '../../../components/links/external-link'
import IconExternal from '../../../components/icons/icon-external'
import FadeInChildList from '../../../components/fade-in/fade-in-child-list'

const features = [
  { name: 'Save and Forget', icon: <IconLinkedin /> },
  { name: 'Highest Transparency', icon: <IconLinkedin /> },
  { name: 'Insure from Hacks', icon: <IconLinkedin /> },
  { name: 'Innovation', icon: <IconLinkedin /> },
  { name: 'Your Backup Plan', icon: <IconLinkedin /> },
  { name: 'Grow Long-term', icon: <IconLinkedin /> },
  { name: 'Own Your Money', icon: <IconLinkedin /> },
  { name: 'Future of Finance', icon: <IconLinkedin /> },
  { name: 'Control Protocol', icon: <IconLinkedin /> },
  { name: 'Passive Income', icon: <IconLinkedin /> },
  { name: 'Stay Anonymous', icon: <IconLinkedin /> },
  { name: 'Decentralized', icon: <IconLinkedin /> },
  { name: 'Easy to Use', icon: <IconLinkedin /> },
  { name: 'Keep Your Wallet', icon: <IconLinkedin /> },
]

export default function Features() {

  return (
    <div className="flex flex-col gap-4">
      <Heading tag="h3">Main Features</Heading>

      <ul className={styles.features}>
        <FadeInChildList>
          {features.map((data) => {
            return <Chip key={data.name} text={data.name} icon={data.icon} />
          })}
        </FadeInChildList>
      </ul>

      <LitepaperLink />
    </div>
  )
}

interface ChipProps {
  text: string
  icon: React.ReactNode
}

function Chip({ text, icon }: ChipProps) {
  return (
    <li className={styles.chip}>
      {icon}
      {text}
    </li>
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
