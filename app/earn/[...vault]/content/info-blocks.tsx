'use client'

import clsx from 'clsx'
import { Fees } from '../info-blocks/fees'
import { VaultToken } from '../info-blocks/vault-token'
import { WithdrawLimits } from '../info-blocks/withdraw-limits'
import { AssetSafety } from '../info-blocks/asset-safety'
import { ProtocolInsurance } from '../info-blocks/protocol-insurance'
import { WalletInsurance } from '../info-blocks/wallet-insurance'
import styles from './info-blocks.module.scss'
import { useHideAnimtion } from '@/components/fade-in/animation'

export function LimitBlocks({ show }: { show: boolean }) {
  const hide = useHideAnimtion(show, 200)
  return (
    <div
      className={clsx(styles.infoBlocks, {
        [styles.show]: show,
        [styles.hide]: hide,
      })}
    >
      <Fees />
      <WithdrawLimits />
      <VaultToken />
    </div>
  )
}

export function SafetyBlocks({ show }: { show: boolean }) {
  const hide = useHideAnimtion(show, 200)
  return (
    <div
      className={clsx(styles.infoBlocks, {
        [styles.show]: show,
        [styles.hide]: hide,
      })}
    >
      <AssetSafety />
      <ProtocolInsurance />
      <WalletInsurance />
    </div>
  )
}
