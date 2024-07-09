import { useMemo } from 'react'
import { useVaultInputContext } from './use-vault-input-context'
import { useAppSelector } from '@/store/hooks'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { toUSDValue } from '@/shared'
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
  const { decimals, price } = vault.asset
  const { value: tokenPrice, decimals: priceDecimals } = price
  const depositInUSD = toUSDValue(total, decimals, tokenPrice)
  const changeInUSD = toUSDValue(change, decimals, tokenPrice)
  return { depositInUSD, changeInUSD, decimals: priceDecimals }
}
