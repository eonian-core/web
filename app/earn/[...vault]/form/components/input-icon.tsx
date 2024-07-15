import { useVaultInputContext } from '../../hooks/use-vault-input-context'
import styles from './input-icon.module.scss'
import type { Vault } from '@/api'
import IconCoin from '@/components/icons/icon-coin'
import IconWallet from '@/components/icons/icon-wallet'
import { getAssetSymbol } from '@/earn/components/vault-card/vault-card-features'
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
  const { formAction } = useVaultInputContext()

  function renderIcon(type: ICON_TYPE) {
    switch (type) {
      case 'WALLET':
        return <IconWallet className={styles.wallet} width={size} height={size} />
      case 'COIN':
        return <IconCoin symbol={getAssetSymbol(vault)} width={size} height={size} />
    }
  }
  return renderIcon(iconResolver[formAction][type])
}
