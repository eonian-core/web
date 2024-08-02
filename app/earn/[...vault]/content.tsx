'use client'

import styles from './content.module.scss'
import Form from './form/form'
import { VaultProvider } from './hooks/use-vault-context'
import { Portfolio } from './portfolio/portfolio'
import { Returns } from './returns/returns'
import { InsuranceOfAssets } from './info-blocks/insurance-of-assets'
import { AssetSafety } from './info-blocks/asset-safety'
import { ProtocolInsurance } from './info-blocks/protocol-insurance'
import { WalletInsurance } from './info-blocks/wallet-insurance'
import { Fees } from './info-blocks/fees'
import { WithdrawLimits } from './info-blocks/withdraw-limits'
import { VaultToken } from './info-blocks/vault-token'
import type { TokenSymbol } from '@/types'
import type { Vault } from '@/api'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

interface Props {
  vault: Vault
  chainId: ChainId
  symbol: TokenSymbol
}

export function Content({ vault, chainId, symbol }: Props) {
  return (
    <VaultProvider vault={vault}>
      <div className={styles.container}>
        <section className={styles.right}>
          <Portfolio />
          <InsuranceOfAssets />
          <SafetyBlocks />
        </section>

        <section className={styles.middle}>
          <Form chainId={chainId} />
          <LimitBlocks />
        </section>

        <section className={styles.left}>
          <Returns symbol={symbol} />
        </section>
      </div>
      <div className={styles.mobileInfoBlocks}>
        <SafetyBlocks />
        <LimitBlocks />
      </div>
    </VaultProvider>
  )
}

function SafetyBlocks() {
  return (
    <div className={styles.infoBlocks}>
      <AssetSafety />
      <ProtocolInsurance />
      <WalletInsurance />
    </div>
  )
}

function LimitBlocks() {
  return (
    <div className={styles.infoBlocks}>
      <Fees />
      <WithdrawLimits />
      <VaultToken />
    </div>
  )
}
