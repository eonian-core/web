import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useNumberInputValue } from './use-number-input-value'
import { coinsPlaceholders, usePlaceholderAnimation } from './use-placeholder-animation'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { getAssetSymbol } from '@/api/vaults/get-asset-symbol'

interface VaultContextType {
  inputValue?: bigint
  displayValue?: string
  placeholderValue: bigint
  placeholderDisplayValue: string
  formAction: FormAction
  insured: boolean
  vault: Vault
  showPlaceholder: boolean
  onValueChange: (value: string | bigint) => void
  onPlaceholderChange: (value: string | bigint) => void
  setFormAction: (action: FormAction) => void
  setInsured: (insured: boolean) => void
}

let VaultContext: React.Context<VaultContextType>

function createVaultContext(vault: Vault) {
  if (VaultContext)
    return VaultContext

  return (VaultContext = createContext<VaultContextType>({
    formAction: FormAction.DEPOSIT,
    insured: true,
    vault,
    placeholderValue: 0n,
    placeholderDisplayValue: '0',
    showPlaceholder: true,
    onValueChange: () => {},
    onPlaceholderChange: () => {},
    setFormAction: () => {},
    setInsured: () => {},
  }))
}

export function VaultProvider({ children, vault }: PropsWithChildren<{ vault: Vault }>) {
  createVaultContext(vault)

  const { value, displayValue, onValueChange } = useNumberInputValue(undefined, vault.asset.decimals)
  const { value: placeholderValue = 0n, displayValue: placeholderDisplayValue = '0', onValueChange: onPlaceholderChange } = useNumberInputValue(0n, vault.asset.decimals)
  const [formAction, setFormAction] = useState<FormAction>(FormAction.DEPOSIT)
  const [insured, setInsured] = useState(true)

  const { status } = useWalletWrapperContext()

  const symbol = getAssetSymbol(vault)
  usePlaceholderAnimation(coinsPlaceholders[symbol], onPlaceholderChange)

  return (
    <VaultContext.Provider
      value={{
        vault,
        inputValue: value,
        displayValue,
        onValueChange,
        placeholderValue: status === WalletStatus.CONNECTED ? 0n : placeholderValue,
        placeholderDisplayValue: status === WalletStatus.CONNECTED ? '0' : placeholderDisplayValue,
        onPlaceholderChange,
        showPlaceholder: status !== WalletStatus.CONNECTED && (typeof displayValue === 'undefined' || displayValue === ''),
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
  return useContext(VaultContext)
}
