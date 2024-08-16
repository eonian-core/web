import type { PropsWithChildren } from 'react'
import { ExternalAction } from '../second-line/actions'
import styles from './vault-title.module.scss'

import { Tag } from '@/components/chip/tag'
import IconChevron from '@/components/icons/icon-chevron'

export function VaultTitle({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

function HowVaultWorks() {
  return <ExternalAction href="https://docs.eonian.finance/basics/how-eonian-works">How Vault works?</ExternalAction>
}

export function VaultTags({ children }: PropsWithChildren) {
  return (
    <ul className={styles.tags}>
      {children}
      <HowVaultWorks />
    </ul>
  )
}

export function VaultTag({ children }: PropsWithChildren) {
  return <li><Tag>{children}</Tag></li>
}
