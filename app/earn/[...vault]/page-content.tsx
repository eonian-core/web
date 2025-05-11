'use client'

import { VaultProvider } from './hooks/use-vault-context'
import { Header } from './header/header'
import { Content } from './content/content'
import styles from './page.module.scss'
import type { TokenSymbol, Vault } from '@/types'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

interface Props {
  vault: Vault
  symbol: TokenSymbol
  currentPrice: number
  chainId: ChainId
}

export function PageContent({ vault, symbol, currentPrice, chainId }: Props) {
  return (
    <VaultProvider vault={vault} chainId={chainId}>
      <div className={styles.page}>
        <Header {...{ symbol, currentPrice }} />
        <Content {...{ symbol }} />
      </div>
    </VaultProvider>
  )
}
