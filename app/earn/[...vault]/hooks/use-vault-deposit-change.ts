import { useMemo } from 'react'
import { useVaultContext } from './use-vault-context'
import { useAppSelector } from '@/store/hooks'
import { FormAction } from '@/store/slices/vaultActionSlice'
import { getAmountInUSD } from '@/shared'
import type { Vault } from '@/api'

export function useVaultDeposit() {
  const { vaultBalanceBN } = useAppSelector(state => state.vaultUser)
  return useDeposit(vaultBalanceBN)
}

export function useVaultDepositUSD(vault: Vault) {
  const [total, change] = useVaultDeposit()
  const [depositInUSD, priceDecimals] = getAmountInUSD(total, vault)
  const changeInUSD = getAmountInUSD(change, vault)
  return { depositInUSD, changeInUSD, deposit: total, decimals: priceDecimals }
}

function useDeposit(amount: bigint | string) {
  const { inputValue, formAction } = useVaultContext()
  const amountBN = BigInt(amount)
  const total = useMemo(() => {
    switch (formAction) {
      case FormAction.DEPOSIT:
        return amountBN + inputValue
      case FormAction.WITHDRAW:
        return amountBN < inputValue ? 0n : amountBN - inputValue
    }
  }, [amountBN, inputValue, formAction])
  return [total, total - amountBN] as const
}
