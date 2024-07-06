import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import { useNumberInputValue } from './use-number-input-value'
import type { Vault } from '@/api'

interface VaultInputContextType {
  inputValue: bigint
  displayValue: string
  onValueChange: (value: string | bigint) => void
}

const VaultInputContext = createContext<VaultInputContextType>({
  inputValue: 0n,
  displayValue: '0',
  onValueChange: () => {},
})

export function VaultInputProvider({ children, vault }: PropsWithChildren<{ vault: Vault }>) {
  const [value, displayValue, handleValueChange] = useNumberInputValue(0n, vault.asset.decimals)
  return (
    <VaultInputContext.Provider value={{ inputValue: value, displayValue, onValueChange: handleValueChange }}>
      {children}
    </VaultInputContext.Provider>
  )
}

export function useVaultInputContext() {
  return useContext(VaultInputContext)
}
