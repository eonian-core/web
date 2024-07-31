import { useVaultContext } from '../../hooks/use-vault-context'
import styles from './input-icon.module.scss'
import type { Vault } from '@/api'
import { getAssetSymbol } from '@/api/vaults/get-asset-symbol'
import IconCoin from '@/components/icons/icon-coin'
import IconWallet from '@/components/icons/icon-wallet'
import { FormAction } from '@/store/slices/vaultActionSlice'

type ICON_TYPE = 'WALLET' | 'COIN'
type INPUT_TYPE = 'INPUT' | 'PREVIEW'

interface Props {
  type: INPUT_TYPE
  vault: Vault
  size?: string | number
}

const iconResolver: Record<FormAction, Record<INPUT_TYPE, ICON_TYPE>> = {
  [FormAction.DEPOSIT]: {
    INPUT: 'WALLET',
    PREVIEW: 'COIN',
  },
  [FormAction.WITHDRAW]: {
    INPUT: 'COIN',
    PREVIEW: 'WALLET',
  },
}

export function InputIcon({ type, vault, size = '1.5em' }: Props) {
  const { formAction } = useVaultContext()

  const iconType = iconResolver[formAction][type]
  if (iconType === 'WALLET')
    return <IconWallet className={styles.wallet} width={size} height={size} />

  return <IconCoin symbol={getAssetSymbol(vault)} width={size} height={size} />
}
