import styles from './blocknative-link.module.scss'
import IconShieldHeart from '@/components/icons/icon-shield-heart'
import { WrapperLink } from '@/components/links/wrapper-link'

export function BlocknativeLink() {
  return (
    <WrapperLink
      className={styles.container}
      href="https://www.blocknative.com/"
      withIcon
    >
      <IconShieldHeart className={styles.icon} />
      Secured by Blocknative
    </WrapperLink>
  )
}
