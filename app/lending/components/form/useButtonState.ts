import { useAvailableBalanceByTab } from '../../hooks/useAvailableBalanceByTab'
import type { FormData } from '../../LendingState'
import { useLendingState } from '../../LendingState'
import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { FormTab } from './types'
import { usePreviewValues } from './usePreviewValues'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

const labels: Record<FormTab, string> = {
  [FormTab.SUPPLY]: 'Supply',
  [FormTab.WITHDRAW]: 'Withdraw',
  [FormTab.BORROW]: 'Borrow',
  [FormTab.REPAY]: 'Repay',
}

const pendingLabels: Record<FormTab, string> = {
  [FormTab.SUPPLY]: 'Supplying...',
  [FormTab.WITHDRAW]: 'Withdrawing...',
  [FormTab.BORROW]: 'Borrowing...',
  [FormTab.REPAY]: 'Repaying...',
}

export enum ButtonStateType {
  WALLET_NOT_CONNECTED = 'wallet_not_connected',
  WALLET_CONNECTING = 'wallet_connecting',
  CHAIN_NOT_SUPPORTED = 'chain_not_supported',
  WALLET_FAILED_TO_CONNECT = 'wallet_failed_to_connect',
  INPUT_EMPTY = 'input_empty',
  INSUFFICIENT_BALANCE = 'insufficient_balance',
  BORROW_CAPACITY_EXCEEDED = 'borrow_capacity_exceeded',
  READY = 'ready',
  ACTION_PENDING = 'action_pending',
}

type ButtonState = [text: string, type: ButtonStateType]

type ButtonBehavior = 'disabled' | 'loading' | 'active'

export function useButtonState(inputData: NumberInputValue, formData: FormData): ButtonState {
  const { status, chain, wallet, provider } = useWalletWrapperContext()
  const { chainId: lendingChainId, chainName, isActionPending } = useLendingState()
  const chainId = chain?.id ?? ChainId.UNKNOWN

  const { borrowCapacityUsed } = usePreviewValues(inputData, formData)

  const { isEnoughToCoverAll } = useAvailableBalanceByTab()

  if (status === WalletStatus.NOT_CONNECTED)
    return ['Connect wallet', ButtonStateType.WALLET_NOT_CONNECTED]

  if (status === WalletStatus.CONNECTING)
    return ['Connecting wallet...', ButtonStateType.WALLET_CONNECTING]

  if (chainId !== lendingChainId)
    return [`Switch to ${chainName}`, ButtonStateType.CHAIN_NOT_SUPPORTED]

  if (!wallet || !provider)
    return ['Failed to connect wallet', ButtonStateType.WALLET_FAILED_TO_CONNECT]

  if (!inputData.value)
    return [`Enter amount to ${labels[formData.tab].toLowerCase()}`, ButtonStateType.INPUT_EMPTY]

  if (!isEnoughToCoverAll(inputData.value))
    return ['Insufficient balance', ButtonStateType.INSUFFICIENT_BALANCE]

  if (borrowCapacityUsed > 97.5)
    return ['Liquidation risk is too high!', ButtonStateType.BORROW_CAPACITY_EXCEEDED]

  if (isActionPending)
    return [pendingLabels[formData.tab], ButtonStateType.ACTION_PENDING]

  return [labels[formData.tab], ButtonStateType.READY]
}

export function getButtonBehavior(type: ButtonStateType): ButtonBehavior {
  switch (type) {
    case ButtonStateType.WALLET_CONNECTING:
    case ButtonStateType.ACTION_PENDING:
      return 'loading'
    case ButtonStateType.WALLET_FAILED_TO_CONNECT:
    case ButtonStateType.INPUT_EMPTY:
    case ButtonStateType.INSUFFICIENT_BALANCE:
    case ButtonStateType.BORROW_CAPACITY_EXCEEDED:
      return 'disabled'
    case ButtonStateType.CHAIN_NOT_SUPPORTED:
    case ButtonStateType.WALLET_NOT_CONNECTED:
    case ButtonStateType.READY:
      return 'active'
  }
}
