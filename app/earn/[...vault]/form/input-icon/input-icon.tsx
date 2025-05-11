import styles from './input-icon.module.scss'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import IconCoin from '@/components/icons/icon-coin'
import IconWallet from '@/components/icons/icon-wallet'
import type { Vault } from '@/types'

export function WalletInputIcon({ size = '1.5em' }: { size?: string }) {
  return <IconWallet className={styles.wallet} width={size} height={size} />
}

interface PreviewInputCoinProps {
  vault: Vault
  size?: string | number
}

export function PreviewInputCoin({ vault, size = '1.5em' }: PreviewInputCoinProps) {
  return <IconCoin symbol={getAssetSymbol(vault)} width={size} height={size} />
}
