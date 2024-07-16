import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useNumberInputValue } from './use-number-input-value'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'

interface VaultInputContextType {
  inputValue: bigint
  displayValue: string
  formAction: FormAction
  insured: boolean
  onValueChange: (value: string | bigint) => void
  setFormAction: (action: FormAction) => void
  setInsured: (insured: boolean) => void
}

const VaultInputContext = createContext<VaultInputContextType>({
  inputValue: 0n,
  displayValue: '0',
  formAction: FormAction.DEPOSIT,
  insured: true,
  onValueChange: () => {},
  setFormAction: () => {},
  setInsured: () => {},
})

export function VaultInputProvider({ children, vault }: PropsWithChildren<{ vault: Vault }>) {
  const [value, displayValue, handleValueChange] = useNumberInputValue(0n, vault.asset.decimals)
  const [formAction, setFormAction] = useState<FormAction>(FormAction.DEPOSIT)
  const [insured, setInsured] = useState(true)
  return (
    <VaultInputContext.Provider
      value={{
        inputValue: value,
        displayValue,
        onValueChange: handleValueChange,
        formAction,
        setFormAction,
        insured,
        setInsured,
      }}
    >
      {children}
    </VaultInputContext.Provider>
  )
}

export function useVaultInputContext() {
  return useContext(VaultInputContext)
}
