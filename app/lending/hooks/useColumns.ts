import React from 'react'
import { useIsTabletOrSmaller } from '../../components/resize-hooks/screens'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'

const COLUMNS = {
  asset: 'Asset',
  utilizationRate: 'Utilization Rate',
  supplyAPY: 'Supply APY',
  borrowAPY: 'Borrow APY',
  liquidity: 'Liquidity',
  totalSupply: 'Total Supply',
  totalBorrow: 'Total Borrow',
}

const CONNECTED_COLUMNS = {
  asset: 'Asset',
  utilizationRate: 'Utilization Rate',
  supplyAPY: 'Supply APY',
  borrowAPY: 'Borrow APY',
  yourSupply: 'Your Supply',
  yourBorrow: 'Your Borrow',
  walletBalance: 'Wallet Balance',
}

export type ColumnKey = keyof typeof COLUMNS | keyof typeof CONNECTED_COLUMNS

export function useColumns() {
  const { status } = useWalletWrapperContext()
  const isConnected = status === WalletStatus.CONNECTED

  const isTabletOrSmaller = useIsTabletOrSmaller()

  return React.useMemo(() => {
    const columns = isConnected ? CONNECTED_COLUMNS : COLUMNS

    let keys = Object.keys(columns)
    if (isTabletOrSmaller)
      keys = keys.filter(key => key !== 'utilizationRate')

    return keys.map(key => ({
      key: key as ColumnKey,
      label: columns[key as keyof typeof columns],
    }))
  }, [isConnected, isTabletOrSmaller])
}
