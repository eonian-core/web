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
import type { PriceData } from '@/types'
import type { Vault } from '@/api'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

interface Props {
  vault: Vault
  chainId: ChainId
  yearlyPriceData: PriceData[]
}

export function Content({ vault, chainId, yearlyPriceData }: Props) {
  return (
    <VaultProvider vault={vault}>
      <div className={styles.container}>
        <section className={styles.right}>
          <Portfolio />
          <InsuranceOfAssets />
          <AssetSafety />
          <ProtocolInsurance />
          <WalletInsurance />
        </section>

        <section className={styles.middle}>
          <Form chainId={chainId} />

          <div className={styles.middleInner}>
            <Fees />
            <WithdrawLimits />
            <VaultToken />
          </div>
        </section>

        <section className={styles.left}>
          <Returns yearlyPriceData={yearlyPriceData} />
        </section>
      </div>
    </VaultProvider>
  )
}
