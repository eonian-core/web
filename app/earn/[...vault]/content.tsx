'use client'

import styles from './content.module.scss'
import Form from './form/form'
import { VaultInputProvider } from './hooks/use-vault-input-context'
import { Portfolio } from './portfolio/portfolio'
import { Returns } from './returns/returns'
import { InsuranceOfAssets } from './info-blocks/insurance-of-assets'
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
    <VaultInputProvider vault={vault}>
      <div className={styles.container}>

        <section className={styles.right}>
          <Portfolio vault={vault} />
          <InsuranceOfAssets />
        </section>

        <section className={styles.middle}>
          <Form vault={vault} chainId={chainId} />
        </section>

        <section className={styles.left}>
          <Returns vault={vault} yearlyPriceData={yearlyPriceData} />
        </section>

      </div>
    </VaultInputProvider>
  )
}
