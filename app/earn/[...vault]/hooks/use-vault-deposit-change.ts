import { useMemo } from 'react'
import { useVaultInputContext } from './use-vault-input-context'
import { useAppSelector } from '@/store/hooks'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { getAmountInUSD, toUSDValue } from '@/shared'
import type { Vault } from '@/api'

export function useVaultDeposit() {
  const { inputValue, formAction } = useVaultInputContext()
  const { vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  const currentDeposit = BigInt(vaultBalanceBN)
  const total = useMemo(() => {
    switch (formAction) {
      case FormAction.DEPOSIT:
        return currentDeposit + inputValue
      case FormAction.WITHDRAW:
        return currentDeposit < inputValue ? 0n : currentDeposit - inputValue
    }
  }, [currentDeposit, inputValue, formAction])
  return [total, total - currentDeposit] as const
}

export function useVaultDepositUSD(vault: Vault) {
  const [total, change] = useVaultDeposit()
  const [depositInUSD, priceDecimals] = getAmountInUSD(total, vault)
  const changeInUSD = getAmountInUSD(change, vault)
  return { depositInUSD, changeInUSD, decimals: priceDecimals }
}
