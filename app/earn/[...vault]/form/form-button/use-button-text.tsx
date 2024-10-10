import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { FormAction } from '@/store/slices/types'

interface ButtonTextProps {
  insured: boolean
  status: WalletStatus
  isOnDifferentChain?: boolean
  chainName?: string
  formAction: FormAction
  walletAvailable?: boolean
  haveInputValue?: boolean
  haveEnoughAssets?: boolean
}

/** Important to keep it as hook, to use rendered text for event tracking */
export function useButtonText({ insured, status, isOnDifferentChain, chainName, formAction, walletAvailable, haveInputValue, haveEnoughAssets }: ButtonTextProps) {
  if (!insured)
    return 'Asset Insurance Required'

  if (status === WalletStatus.NOT_CONNECTED)
    return 'Connect wallet'

  if (status === WalletStatus.CONNECTING)
    return 'Connecting wallet...'

  // wallet connected...

  if (isOnDifferentChain)
    return `Switch to ${chainName}`

  if (!walletAvailable)
    return 'Failed to connect wallet'

  if (!haveInputValue)
    return formAction === FormAction.DEPOSIT ? 'Enter amount to save' : 'Enter amount to withdraw'

  if (!haveEnoughAssets)
    return formAction === FormAction.DEPOSIT ? 'Insufficient wallet balance' : 'Insufficient account balance'

  if (formAction === FormAction.DEPOSIT)
    return 'Save'

  return 'Withdraw'
}

export default useButtonText
