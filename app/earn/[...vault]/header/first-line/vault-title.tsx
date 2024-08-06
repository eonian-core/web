import type { PropsWithChildren } from 'react'
import { ExternalAction } from '../second-line/actions'
import styles from './vault-title.module.scss'
import type { TokenSymbol } from '@/types'
import IconCoin from '@/components/icons/icon-coin'
import { interFont } from '@/shared/fonts/Inter'
import { DisplaySymbol } from '@/components/vault-card/display-symbol'
import { Tag } from '@/components/chip/tag'

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

export interface VaultNameProps extends PropsWithChildren {
  symbol: TokenSymbol
}

const logoSize = 58

export function VaultName({ symbol, children }: VaultNameProps) {
  return (
    <div className={styles.info}>
      <IconCoin symbol={symbol} width={logoSize} height={logoSize} />
      <div className={styles.title}>
        <h1 className={interFont.className}>{children}</h1>
        <h2><DisplaySymbol>{symbol}</DisplaySymbol></h2>
      </div>
    </div>
  )
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
