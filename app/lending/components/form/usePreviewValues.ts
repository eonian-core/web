import type { NumberInputValue } from '../../hooks/useNumberInputValue'
import { useLendingState } from '../../LendingState'
import type { FormData } from '../../LendingState'
import { convertUnderlyingToUSD } from '../../web3/utils'
import type { Market } from '../../web3/types'
import { calculateBorrowCapacityUsed, calculateNetAPY } from '../../web3/calculate-statistics'
import { FormTab } from './types'

export function usePreviewValues(inputData: NumberInputValue, formData: FormData) {
  const markets = useMarketAdjustment(inputData, formData)
  const borrowCapacityUsed = Math.max(calculateBorrowCapacityUsed(markets), 0)
  const netAPY = calculateNetAPY(markets)
  return {
    borrowCapacityUsed,
    netAPY,
  }
}

function useMarketAdjustment(inputData: NumberInputValue, formData: FormData): Market[] {
  const { markets } = useLendingState()
  return markets.map((market) => {
    if (formData.market.address !== market.address)
      return market

    const userPosition = { ...market.userPosition }
    const value = inputData.value || 0n
    const valueInUSD = convertUnderlyingToUSD(value, market)
    switch (formData.tab) {
      case FormTab.SUPPLY: {
        userPosition.supplyBalanceInUnderlying = userPosition.supplyBalanceInUnderlying + value
        userPosition.supplyBalanceInUSD = userPosition.supplyBalanceInUSD + valueInUSD
        break
      }
      case FormTab.BORROW: {
        userPosition.borrowBalanceInUnderlying = userPosition.borrowBalanceInUnderlying + value
        userPosition.borrowBalanceInUSD = userPosition.borrowBalanceInUSD + valueInUSD
        break
      }
      case FormTab.WITHDRAW: {
        userPosition.supplyBalanceInUnderlying = userPosition.supplyBalanceInUnderlying - value
        userPosition.supplyBalanceInUSD = max(userPosition.supplyBalanceInUSD - valueInUSD, 0n)
        break
      }
      case FormTab.REPAY: {
        userPosition.borrowBalanceInUnderlying = userPosition.borrowBalanceInUnderlying - value
        userPosition.borrowBalanceInUSD = max(userPosition.borrowBalanceInUSD - valueInUSD, 0n)
        break
      }
    }
    return { ...market, userPosition }
  })
}

function max(a: bigint, b: bigint) {
  return a > b ? a : b
}
