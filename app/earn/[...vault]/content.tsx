'use client'

import { useHover } from '@uidotdev/usehooks'
import clsx from 'clsx'
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
import { useHideAnimtion } from '@/components/fade-in/animation'

interface Props {
  vault: Vault
  chainId: ChainId
  symbol: TokenSymbol
}

export function Content({ vault, chainId, symbol }: Props) {
  const [leftSectionRef, leftSectionHovering] = useHover()
  const [formRef, formHovering] = useHover()

  return (
    <VaultProvider vault={vault}>
      <div className={styles.container}>
        <section ref={leftSectionRef} className={styles.right}>
          <Portfolio />
          <InsuranceOfAssets />
          <SafetyBlocks show={leftSectionHovering} />
        </section>

        <section ref={formRef} className={styles.middle}>
          <Form chainId={chainId} />
          <LimitBlocks show={formHovering}/>
        </section>

        <section className={styles.left}>
          <Returns symbol={symbol} />
        </section>
      </div>
      <div className={styles.mobileInfoBlocks}>
        <SafetyBlocks show/>
        <LimitBlocks show/>
      </div>
    </VaultProvider>
  )
}

function SafetyBlocks({ show }: { show: boolean }) {
  const hide = useHideAnimtion(show, 200)
  return (
    <div className={clsx(styles.infoBlocks, {
      [styles.show]: show,
      [styles.hide]: hide,
    })}>
      <AssetSafety />
      <ProtocolInsurance />
      <WalletInsurance />
    </div>
  )
}

function LimitBlocks({ show }: { show: boolean }) {
  const hide = useHideAnimtion(show, 200)
  return (
    <div className={clsx(styles.infoBlocks, {
      [styles.show]: show,
      [styles.hide]: hide,
    })}>
      <Fees />
      <WithdrawLimits />
      <VaultToken />
    </div>
  )
}
