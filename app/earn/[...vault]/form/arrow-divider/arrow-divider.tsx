import { useCallback } from 'react'
import { useVaultContext } from '../../hooks/use-vault-context'
import { focusOnInput } from '../form-input/form-input'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useAppSelector } from '@/store/hooks'
import { PickerDivider } from '@/components/picker-divider/picker-divider'

const options = [0.25, 0.5, 0.75, 1]

export function ArrowDivider() {
  const { formAction, setFormAction, inputValue = 0n, vault, onValueChange } = useVaultContext()
  const handleClick = useCallback(() => {
    setFormAction(formAction === FormAction.DEPOSIT ? FormAction.WITHDRAW : FormAction.DEPOSIT)

    focusOnInput()
  }, [formAction, setFormAction])

  const { status } = useWalletWrapperContext()
  const isWalletConnected = status === WalletStatus.CONNECTED

  const { walletBalanceBN, vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const balance = formAction === FormAction.DEPOSIT ? BigInt(walletBalanceBN) : BigInt(vaultBalanceBN)

  const balanceNotEmpty = balance > 0n

  return (
    <PickerDivider
      balance={balance}
      decimals={vault.asset.decimals}
      inputValue={inputValue}
      onValueChange={onValueChange}
      reverse={formAction === FormAction.WITHDRAW}
      onClick={handleClick}
      show={isWalletConnected && balanceNotEmpty}
      withBottomMargin
    >{options}</PickerDivider>
  )
}
