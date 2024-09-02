import styles from './vault-title.module.scss'
import { ResourcesLinks } from '@/features'
import { WrapperLink } from '@/components/links/wrapper-link'

export function VaultLinks() {
  return (
    <div className={styles.links}>
      <HowVaultWorks />
      <WrapperLink href={ResourcesLinks.TOS.href} withIcon>
        {ResourcesLinks.TOS.label}
      </WrapperLink>
    </div>
  )
}

function HowVaultWorks() {
  return (
    <WrapperLink href="https://docs.eonian.finance/basics/how-eonian-works" withIcon>
      How Vault works?
    </WrapperLink>
  )
}
