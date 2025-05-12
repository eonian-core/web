import { ZeroAddress } from 'ethers'
import type { Market, MarketExtended, MarketRaw, UserMarketPosition, UserMarketPositionExtended, UserMarketPositionRaw } from './types'
import {
  calculateAPY,
  convertCTokenToUnderlying,
  convertUSDToUnderlying,
  convertUnderlyingToUSD,
  formatAPY,
  formatUSD,
  formatUnderlying,
} from './utils'
import IconUSDC from '@/components/icons/icon-usdc'
import IconEthereum from '@/components/icons/icon-ethereum'
import IconTether from '@/components/icons/icon-tether'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

export function enrichMarkets(chainId: ChainId, rawMarkets: MarketRaw[], rawUserPositions: UserMarketPositionRaw[]): Market[] {
  const userPositions = rawUserPositions.map((position) => {
    const market = rawMarkets.find(market => market.address === position.marketAddress)!
    return finalizeUserPosition(extendUserPosition(position, market), market)
  })

  return rawMarkets.map((market) => {
    const userPosition
      = userPositions.find(position => position.marketAddress === market.address) ?? defaultUserPosition(market.address, market)
    return finalizeMarket(extendMarket(chainId, market), userPosition)
  })
}

function extendMarket(chainId: ChainId, market: MarketRaw): MarketExtended {
  const totalSupplyInUnderlying = convertCTokenToUnderlying(market.totalSupply, market)
  return {
    ...market,

    borrowAPY: calculateAPY(market.borrowRatePerBlock, chainId),
    supplyAPY: calculateAPY(market.supplyRatePerBlock, chainId),
    totalSupplyInUnderlying,
    totalSupplyInUSD: convertUnderlyingToUSD(totalSupplyInUnderlying, market),
    totalBorrowInUSD: convertUnderlyingToUSD(market.totalBorrowInUnderlying, market),
    cashInUSD: convertUnderlyingToUSD(market.cashInUnderlying, market),
  }
}

function finalizeMarket(market: MarketExtended, userPosition: UserMarketPosition): Market {
  return {
    ...market,
    icon: getIcon(market.underlyingSymbol),
    userPosition,
    displayValues: {
      totalSupplyInUnderlying: formatUnderlying(market.totalSupplyInUnderlying, market),
      totalSupplyInUSD: formatUSD(market.totalSupplyInUSD),
      totalBorrowInUSD: formatUSD(market.totalBorrowInUSD),
      totalBorrowInUnderlying: formatUnderlying(market.totalBorrowInUnderlying, market),
      cashInUSD: formatUSD(market.cashInUSD),
      cashInUnderlying: formatUnderlying(market.cashInUnderlying, market),
      borrowAPY: formatAPY(market.borrowAPY),
      supplyAPY: formatAPY(market.supplyAPY),
      totalReservesInUnderlying: formatUnderlying(market.totalReservesInUnderlying, market),
    },
  }
}

function extendUserPosition(position: UserMarketPositionRaw, market: MarketRaw): UserMarketPositionExtended {
  const supplyBalanceInUnderlying = convertCTokenToUnderlying(position.supplyBalanceInCToken, market)
  return {
    ...position,

    walletBalanceInUSD: convertUnderlyingToUSD(position.walletBalanceInUnderlying, market),
    supplyBalanceInUSD: convertUnderlyingToUSD(supplyBalanceInUnderlying, market),
    borrowBalanceInUSD: convertUnderlyingToUSD(position.borrowBalanceInUnderlying, market),
    supplyBalanceInUnderlying,
    availableForBorrowBalanceInUnderlying: convertUSDToUnderlying(position.availableForBorrowBalanceInUSD, market),
  }
}

function finalizeUserPosition(position: UserMarketPositionExtended, market: MarketRaw): UserMarketPosition {
  return {
    ...position,
    displayValues: {
      walletBalanceInUSD: formatUSD(position.walletBalanceInUSD),
      supplyBalanceInUSD: formatUSD(position.supplyBalanceInUSD),
      borrowBalanceInUSD: formatUSD(position.borrowBalanceInUSD),
      availableForBorrowBalanceInUnderlying: formatUnderlying(position.availableForBorrowBalanceInUnderlying, market),
      walletBalanceInUnderlying: formatUnderlying(position.walletBalanceInUnderlying, market),
      supplyBalanceInUnderlying: formatUnderlying(position.supplyBalanceInUnderlying, market),
      borrowBalanceInUnderlying: formatUnderlying(position.borrowBalanceInUnderlying, market),
      availableForBorrowBalanceInUSD: formatUSD(position.availableForBorrowBalanceInUSD),
      allowanceInUnderlying: formatUnderlying(position.allowanceInUnderlying, market),
    },
  }
}
function defaultUserPosition(marketAddress: string, market: MarketRaw): UserMarketPosition {
  return {
    marketAddress,
    walletAddress: ZeroAddress,
    isEntered: false,
    supplyBalanceInCToken: 0n,
    walletBalanceInUnderlying: 0n,
    supplyBalanceInUnderlying: 0n,
    borrowBalanceInUnderlying: 0n,
    walletBalanceInUSD: 0n,
    supplyBalanceInUSD: 0n,
    borrowBalanceInUSD: 0n,
    availableForBorrowBalanceInUnderlying: 0n,
    availableForBorrowBalanceInUSD: 0n,
    allowanceInUnderlying: 0n,
    displayValues: {
      walletBalanceInUSD: formatUSD(0n),
      supplyBalanceInUSD: formatUSD(0n),
      borrowBalanceInUSD: formatUSD(0n),
      availableForBorrowBalanceInUnderlying: formatUnderlying(0n, market),
      walletBalanceInUnderlying: formatUnderlying(0n, market),
      supplyBalanceInUnderlying: formatUnderlying(0n, market),
      borrowBalanceInUnderlying: formatUnderlying(0n, market),
      availableForBorrowBalanceInUSD: formatUSD(0n),
      allowanceInUnderlying: formatUnderlying(0n, market),
    },
  }
}

function getIcon(symbol: string): React.ReactNode {
  switch (symbol) {
    case 'USDC':
    case 'zUSDC':
      return <IconUSDC />
    case 'ETH':
      return <IconEthereum />
    case 'USDT':
    case 'ptUSD':
      return <IconTether />
    default:
      return <IconEthereum />
  }
}
