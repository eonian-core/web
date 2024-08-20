import type { PropsWithChildren } from 'react'
import { ExternalAction } from '../second-line/actions'
import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './vault-title.module.scss'

import { Tag } from '@/components/chip/tag'
import { ChainId, getChainExplorer } from '@/providers/wallet/wrappers/helpers'

export function VaultTitle({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>
}

function HowVaultWorks() {
  return <ExternalAction href="https://docs.eonian.finance/basics/how-eonian-works">How Vault works?</ExternalAction>
}

function ContractAddress() {
  const { vault } = useVaultContext()
  const url = `${getChainExplorer(ChainId.BSC_MAINNET)}/address/${vault.address}#code`
  return <ExternalAction href={url}>How Vault works?</ExternalAction>
}

export function VaultTags({ children }: PropsWithChildren) {
  return (
    <ul className={styles.tags}>
      {children}
      <HowVaultWorks />
      <ContractAddress />
    </ul>
  )
}

export function VaultTag({ children }: PropsWithChildren) {
  return (
    <li>
      <Tag>{children}</Tag>
    </li>
  )
}
