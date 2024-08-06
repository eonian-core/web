import React from 'react'
import { useLocalSocials } from '../../../socials'
import ExternalLink from '../../../components/links/external-link'
import { interFont } from '../../../shared/fonts/Inter'
import styles from './social-proof.module.scss'

export interface SocialProofProps {
  children: React.ReactNode
}

export default function SocialProof({ children }: SocialProofProps) {
  return (
    <div className={styles.container}>
      <div className={styles.socialProof}>
        {children}
      </div>
    </div>
  )
}

interface StatItemProps {
  number: string
  description: string
  children?: React.ReactNode
}

export const SocialProofStatItem: React.FC<StatItemProps> = ({ number, description, children }) => (
  <div className={styles.statItem}>
    <div className={`${styles.number} ${interFont.className}`}>{number}</div>
    <div className={styles.description}>{description}</div>
    {children && <div className={styles.children}>{children}</div>}
  </div>
)

export const SocialProofBody: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={`${styles.body}`}>
    {children}
  </div>
)

export const SocialProofLinks: React.FC = () => {
  const socials = useLocalSocials()

  return <div>
    <ul className={`${styles.links}`}>
      {socials.map(({ name, href, icon }) => (
        <li key={name}>
          <ExternalLink href={href} icon={icon} />
        </li>
      ))}
    </ul>
  </div>
}

export const SocialProofHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={`${styles.header}`}>
    {children}
  </div>
)
