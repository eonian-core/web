import { RefillNativeToken } from './refill-native-token'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { FormAction } from '@/store/slices/types'

interface ButtonTextProps {
  insured: boolean
  chainId: ChainId
  status: WalletStatus
  isOnDifferentChain?: boolean
  chainName?: string
  formAction: FormAction
  walletAvailable?: boolean
  haveInputValue?: boolean
  haveEnoughAssets?: boolean
  haveEnoughForGasPayment?: boolean
}

/** Important to keep it as hook, to use rendered text for event tracking */
export function useButtonText({
  insured,
  chainId,
  status,
  isOnDifferentChain,
  chainName,
  formAction,
  walletAvailable,
  haveInputValue,
  haveEnoughAssets,
  haveEnoughForGasPayment,
}: ButtonTextProps) {
  if (!insured)
    return 'Asset Insurance Required'

  if (status === WalletStatus.NOT_CONNECTED)
    return 'Connect wallet'

  if (status === WalletStatus.CONNECTING)
    return 'Connecting wallet...'

  if (isOnDifferentChain)
    return `Switch to ${chainName}`

  if (!walletAvailable)
    return 'Failed to connect wallet'

  if (!haveInputValue)
    return formAction === FormAction.DEPOSIT ? 'Enter amount to save' : 'Enter amount to withdraw'

  if (!haveEnoughAssets)
    return formAction === FormAction.DEPOSIT ? 'Insufficient wallet balance' : 'Insufficient account balance'

  if (!haveEnoughForGasPayment)
    return <RefillNativeToken chainId={chainId} />

  if (formAction === FormAction.DEPOSIT)
    return 'Save'

  return 'Withdraw'
}

export default useButtonText
