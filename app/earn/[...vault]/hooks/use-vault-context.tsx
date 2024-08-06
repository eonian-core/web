import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useNumberInputValue } from './use-number-input-value'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'

interface VaultContextType {
  inputValue?: bigint
  displayValue?: string
  formAction: FormAction
  insured: boolean
  vault: Vault
  onValueChange: (value: string | bigint) => void
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
    onValueChange: () => {},
    setFormAction: () => {},
    setInsured: () => {},
  }))
}

export function VaultProvider({ children, vault }: PropsWithChildren<{ vault: Vault }>) {
  createVaultContext(vault)

  const { value, displayValue, onValueChange } = useNumberInputValue(undefined, vault.asset.decimals)
  const [formAction, setFormAction] = useState<FormAction>(FormAction.DEPOSIT)
  const [insured, setInsured] = useState(true)
  return (
    <VaultContext.Provider
      value={{
        vault,
        inputValue: value,
        displayValue,
        onValueChange,
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
