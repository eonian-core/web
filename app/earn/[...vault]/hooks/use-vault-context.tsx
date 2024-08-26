import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useNumberInputValue } from './use-number-input-value'
import { coinsPlaceholders, usePlaceholderAnimation } from './use-placeholder-animation'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'

export interface VaultContextType {
  inputValue?: bigint
  displayValue?: string
  placeholderValue: bigint
  placeholderDisplayValue: string
  formAction: FormAction
  insured: boolean
  vault: Vault
  chainId: ChainId
  showPlaceholder: boolean
  onValueChange: (value: string | bigint) => void
  onPlaceholderChange: (value: string | bigint) => void
  setFormAction: (action: FormAction) => void
  setInsured: (insured: boolean) => void
}

export const VaultContext = createContext<VaultContextType | undefined>(undefined)

export function VaultProvider({ children, vault, chainId }: PropsWithChildren<{ vault: Vault; chainId: ChainId }>) {
  const { value, displayValue, onValueChange } = useNumberInputValue(undefined, vault.asset.decimals)
  const {
    value: placeholderValue = 0n,
    displayValue: placeholderDisplayValue = '0',
    onValueChange: onPlaceholderChange,
  } = useNumberInputValue(0n, vault.asset.decimals)
  const [formAction, setFormAction] = useState<FormAction>(FormAction.DEPOSIT)
  const [insured, setInsured] = useState(true)

  const { status } = useWalletWrapperContext()

  const symbol = getAssetSymbol(vault)
  usePlaceholderAnimation(coinsPlaceholders[symbol], onPlaceholderChange)

  return (
    <VaultContext.Provider
      value={{
        chainId,
        vault,
        inputValue: value,
        displayValue,
        onValueChange,
        placeholderValue: status === WalletStatus.CONNECTED ? 0n : placeholderValue,
        placeholderDisplayValue: status === WalletStatus.CONNECTED ? '0' : placeholderDisplayValue,
        onPlaceholderChange,
        showPlaceholder:
          status !== WalletStatus.CONNECTED && (typeof displayValue === 'undefined' || displayValue === ''),
        formAction,
        setFormAction,
        insured,
        setInsured,
      }}
    >
      {children}
    </VaultContext.Provider>
  )
}

export function useVaultContext() {
  const context = useContext(VaultContext)
  if (!context)
    throw new Error('useVaultContext must be used within a VaultProvider')

  return context
}
