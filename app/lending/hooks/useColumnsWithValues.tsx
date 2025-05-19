import { useLendingState } from '../LendingState'
import { DefaultCell } from '../components/cells/DefaultCell'
import { IconCell } from '../components/cells/IconCell'
import { UtilizationRateCell } from '../components/cells/UtilizationRateCell'
import type { Market } from '../web3/types'
import { calculateUtilizationRate } from '../web3/calculate-utilization-rate'
import { useColumns } from './useColumns'
import type { ColumnKey } from './useColumns'

export interface ColumnWithValues {
  key: ColumnKey
  label: string
  contentOfCells: React.ReactNode[]
}

const HumanReadableName: Record<string, string | undefined> = {
  USDC: 'USD Coin',
  USDT: 'Tether',
  DAI: 'Dai Stablecoin',
  WETH: 'Ether',
  WBTC: 'Bitcoin',
  ptETH: 'Ether',
  ptBTC: 'Bitcoin',
  zUSDC: 'USD Coin',
  ptUSDT: 'Tether',
  ptUSD: 'Tether',
  ptDAI: 'Dai Stablecoin',
}

const columnToContent: Record<ColumnKey, (market: Market) => React.ReactNode> = {
  asset: market => <IconCell icon={market.icon} name={HumanReadableName[market.underlyingSymbol] || market.name} symbol={market.underlyingSymbol} />,
  utilizationRate: market => <UtilizationRateCell rate={calculateUtilizationRate(market)} />,
  supplyAPY: market => <DefaultCell value={market.displayValues.supplyAPY} />,
  borrowAPY: market => <DefaultCell value={market.displayValues.borrowAPY} />,
  liquidity: ({ displayValues }) => <DefaultCell value={displayValues.cashInUnderlying} subValue={displayValues.cashInUSD} />,
  totalSupply: ({ displayValues }) => (
    <DefaultCell value={displayValues.totalSupplyInUnderlying} subValue={displayValues.totalSupplyInUSD} />
  ),
  totalBorrow: ({ displayValues }) => (
    <DefaultCell value={displayValues.totalBorrowInUnderlying} subValue={displayValues.totalBorrowInUSD} />
  ),
  yourSupply: market => (
    <DefaultCell
      value={market.userPosition.displayValues.supplyBalanceInUnderlying}
      subValue={market.userPosition.displayValues.supplyBalanceInUSD}
    />
  ),
  yourBorrow: market => (
    <DefaultCell
      value={market.userPosition.displayValues.borrowBalanceInUnderlying}
      subValue={market.userPosition.displayValues.borrowBalanceInUSD}
    />
  ),
  walletBalance: market => (
    <DefaultCell
      value={market.userPosition.displayValues.walletBalanceInUnderlying}
      subValue={market.userPosition.displayValues.walletBalanceInUSD}
    />
  ),
}

export function useColumnsWithValues(): [boolean, ColumnWithValues[]] {
  const columnsWithoutValues = useColumns()
  const { markets, loading } = useLendingState()

  const columns = columnsWithoutValues.map(column => ({
    ...column,
    contentOfCells: markets.map(market => columnToContent[column.key](market)),
  }))

  return [loading, columns]
}
