import type { Market } from '../../web3/types'
import styles from './MarketInfo.module.scss'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

interface Props {
  market: Market
}
const DEFAULT_INFO: Record<string, [string, (market: Market) => string]> = {
  liquidity: ['Liquidity', market => market.displayValues.cashInUnderlying],
  totalSupply: ['Total Supply', market => market.displayValues.totalSupplyInUnderlying],
  totalBorrow: ['Total Borrow', market => market.displayValues.totalBorrowInUnderlying],
}

const CONNECTED_INFO: Record<string, [string, (market: Market) => string]> = {
  yourSupply: ['Your Supply', market => market.userPosition.displayValues.supplyBalanceInUnderlying],
  yourBorrow: ['Your Borrow', market => market.userPosition.displayValues.borrowBalanceInUnderlying],
  walletBalance: ['Wallet Balance', market => market.userPosition.displayValues.walletBalanceInUnderlying],
}

export function MarketInfo({ market }: Props) {
  const { status } = useWalletWrapperContext()
  const isConnected = status === WalletStatus.CONNECTED

  const info = isConnected ? CONNECTED_INFO : DEFAULT_INFO

  return (
    <div className={styles.marketInfoContainer}>
      {Object.entries(info).map(([key, [label, value]]) => (
        <InfoItem key={key} label={label} value={value(market)} symbol={market.underlyingSymbol} />
      ))}
    </div>
  )
}

function InfoItem({ label, value, symbol }: { label: string; value: string; symbol: string }) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoItemLabel}>{label}</div>
      <div className={styles.infoItemValue}>
        {value}&nbsp;
        <span className={styles.infoItemSymbol}>{symbol}</span>
      </div>
    </div>
  )
}
