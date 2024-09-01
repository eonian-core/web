import { useVaultContext } from '../hooks/use-vault-context'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

export function useHaveWhatToDisplay() {
  const { inputValue = 0n, showPlaceholder, placeholderValue } = useVaultContext()
  const { status } = useWalletWrapperContext()
  if (inputValue !== 0n || status === WalletStatus.CONNECTED)
    return true

  return showPlaceholder && placeholderValue !== 0n
}
