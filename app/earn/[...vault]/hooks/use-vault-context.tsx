import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNumberInputValue } from './use-number-input-value'
import type { Vault } from '@/api'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

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
  usePlaceholderAnimation(onPlaceholderChange, 1000, 300, 50)
  const [formAction, setFormAction] = useState<FormAction>(FormAction.DEPOSIT)
  const [insured, setInsured] = useState(true)

  const { status } = useWalletWrapperContext()

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

const placeholderRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 36, 37, 38, 39, 40, 41, 42]

const timeout = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

function usePlaceholderAnimation(onPlaceholderChange: (value: string | bigint) => void, loadingDelay: number, initialDelay: number, delayDecrease: number) {
  const [haveRun, setHaveRun] = useState(false)

  useEffect(() => {
    let exit = false

    const animate = async () => {
      if (haveRun)
        return

      await timeout(loadingDelay)
      let delay = initialDelay
      await timeout(delay)

      for (const value of placeholderRange) {
        if (exit)
          return

        onPlaceholderChange(`${value}`)
        await timeout(delay)

        if (delay - delayDecrease > 0)
          delay -= delayDecrease
      }

      setHaveRun(true)
    }

    void animate()
      .catch(console.error)

    return () => {
      exit = true
    }
  }, [onPlaceholderChange, haveRun, setHaveRun])
}
