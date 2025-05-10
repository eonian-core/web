import { useLendingState } from '../LendingState'
import { FormTab } from '../components/form/types'
import { useScreenWidth } from './useScreenWidth'

interface AvailableBalance {
  balanceInUnderlying: bigint
  balanceInUnderlyingDisplay: string
  label: string
  isEnoughToCoverAll: (value: bigint) => boolean
}

export function useAvailableBalanceByTab(): AvailableBalance {
  const { formData } = useLendingState()
  const { screenGTE } = useScreenWidth()

  if (!formData || !formData.market) {
    return {
      balanceInUnderlying: 0n,
      balanceInUnderlyingDisplay: '-',
      label: 'Balance',
      isEnoughToCoverAll: () => false,
    }
  }

  const {
    walletBalanceInUnderlying,
    supplyBalanceInUnderlying,
    borrowBalanceInUnderlying,
    availableForBorrowBalanceInUnderlying,
    displayValues,
  } = formData.market.userPosition

  const symbol = formData.market.underlyingSymbol

  switch (formData.tab) {
    case FormTab.SUPPLY:
      return {
        balanceInUnderlying: walletBalanceInUnderlying,
        balanceInUnderlyingDisplay: `${displayValues.walletBalanceInUnderlying} ${symbol}`,
        label: 'Wallet balance',
        isEnoughToCoverAll: (value: bigint) => walletBalanceInUnderlying >= value,
      }
    case FormTab.BORROW:
      return {
        balanceInUnderlying: availableForBorrowBalanceInUnderlying,
        balanceInUnderlyingDisplay: `${displayValues.availableForBorrowBalanceInUnderlying} ${symbol}`,
        label: screenGTE('laptop') ? 'Available to borrow' : 'Available',
        isEnoughToCoverAll: (value: bigint) => availableForBorrowBalanceInUnderlying >= value,
      }
    case FormTab.WITHDRAW:
      return {
        balanceInUnderlying: supplyBalanceInUnderlying,
        balanceInUnderlyingDisplay: `${displayValues.supplyBalanceInUnderlying} ${symbol}`,
        label: screenGTE('laptop') ? 'Available to withdraw' : 'Available',
        isEnoughToCoverAll: (value: bigint) => supplyBalanceInUnderlying >= value,
      }
    case FormTab.REPAY:
      return {
        balanceInUnderlying: borrowBalanceInUnderlying,
        balanceInUnderlyingDisplay: `${displayValues.borrowBalanceInUnderlying} ${symbol}`,
        label: 'Borrow balance',
        isEnoughToCoverAll: (value: bigint) => walletBalanceInUnderlying >= value, // Wallet balance is used for repayment
      }
  }
}
