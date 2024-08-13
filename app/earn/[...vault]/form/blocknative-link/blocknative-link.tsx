import styles from './blocknative-link.module.scss'
import ExternalLink from '@/components/links/external-link'
import IconShieldHeart from '@/components/icons/icon-shield-heart'
import IconExternal from '@/components/icons/icon-external'

export function BlocknativeLink() {
  return (
    <ExternalLink
      className={styles.container}
      href="https://www.blocknative.com/"
      icon={<IconExternal size="0.85em" />}
      iconAtEnd
    >
      <IconShieldHeart className={styles.icon} />
      Secured by Blocknative
    </ExternalLink>
  )
}
