import styles from './protected.module.scss'
import ExternalLink from '@/components/links/external-link'
import IconShieldHeart from '@/components/icons/icon-shield-heart'
import IconExternal from '@/components/icons/icon-external'

export function Protected() {
  return (
    <ExternalLink
      className={styles.container}
      href="https://docs.eonian.finance/security/protocol-audits"
      icon={<IconExternal />}
      iconAtEnd
    >
      <IconShieldHeart className={styles.icon} />
      Audited by Bunzz
      •
      Monitored by Slither
    </ExternalLink>
  )
}
