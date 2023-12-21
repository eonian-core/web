import React from 'react'
import { InternalLink } from '../links/links'
import EonianLogo from './logo'
import styles from './logo-with-text.module.scss'

function LogoWithText() {
  return <InternalLink href="/" className={styles.logo} iconClassName={styles.logoIcon} icon={<EonianLogo width="2.25rem" height="2.25rem" />}>
    <span className={styles.name}>Eonian</span>
  </InternalLink>
}

export default LogoWithText
