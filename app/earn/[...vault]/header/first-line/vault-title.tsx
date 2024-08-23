import type { PropsWithChildren } from 'react'
import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './vault-title.module.scss'

import { Tag } from '@/components/chip/tag'
import { getChainExplorer } from '@/providers/wallet/wrappers/helpers'
import { WrapperLink } from '@/components/links/wrapper-link'
import IconExternal from '@/components/icons/icon-external'

export function VaultTitle({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>
}

function HowVaultWorks() {
  return (
    <WrapperLink href="https://docs.eonian.finance/basics/how-eonian-works" icon={<IconExternal />} iconAtEnd>
      How Vault works?
    </WrapperLink>
  )
}

function ContractAddress() {
  const { vault, chainId } = useVaultContext()
  const url = `${getChainExplorer(chainId)}/address/${vault.address}#code`
  return (
    <WrapperLink href={url} icon={<IconExternal />} iconAtEnd>
      Smart Contract
    </WrapperLink>
  )
}

export function VaultTags({ children }: PropsWithChildren) {
  return <div className={styles.tagsCntainer}><ul className={styles.tags}>{children}</ul></div>
}

export function VaultLinks() {
  return (
    <div className={styles.links}>
      <HowVaultWorks />
      <ContractAddress />
    </div>
  )
}

export function VaultTag({ children }: PropsWithChildren) {
  return (
    <li>
      <Tag>{children}</Tag>
    </li>
  )
}
