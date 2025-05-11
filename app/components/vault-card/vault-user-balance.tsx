import { Spacer, Tooltip } from '@nextui-org/react'
import CompactNumber from '../compact-number/compact-number'
import { useAppSelector } from '../../store/hooks'
import { toStringNumberFromDecimals } from '../../shared'
import { Row } from '../row/Row'
import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../providers/wallet/wrappers/types'
import { OneLineSkeleton } from '../loader/skeleton-loader'
import { toUSDValue } from '@/finances/humanize'
import type { Vault } from '@/types'

export interface VaultUserBalanceProps {
  vault: Vault
}

export function VaultUserBalance({ vault }: VaultUserBalanceProps) {
  const { status: walletStatus } = useWalletWrapperContext()
  const { vaultBalances, isLoading, errors } = useAppSelector(state => state.positionInfo)
  const error = typeof errors === 'string' ? errors : errors[vault.address]
  if (walletStatus === WalletStatus.CONNECTING || isLoading || error)
    return <OneLineSkeleton />

  return (
    <Value
      symbol={vault.asset.symbol}
      balance={vaultBalances[vault.address] ?? 0n}
      decimals={vault.asset.decimals}
      price={vault.asset.price.value}
      priceDecimals={vault.asset.price.decimals}
    />
  )
}

export interface ValueProps {
  balance: bigint
  decimals: number
  symbol: string
  price: bigint
  priceDecimals: number
}

function Value({ balance, decimals, price, symbol, priceDecimals }: ValueProps) {
  const valueAccurate = toStringNumberFromDecimals(balance, decimals)
  const valueUSDAccurate = toStringNumberFromDecimals(toUSDValue(balance, decimals, price), priceDecimals)
  return (
    <Tooltip content={<TooltipContent value={valueAccurate} valueUSD={valueUSDAccurate} symbol={symbol} />}>
      <div>
        <CompactNumber value={balance} decimals={decimals} fractionDigits={2} hideTooltip childrenAtStart={false} />
      </div>
    </Tooltip>
  )
}

export interface TooltipContentProps {
  value: string
  symbol: string
  valueUSD: string
}

function TooltipContent({ value, symbol, valueUSD }: TooltipContentProps) {
  return (
    <>
      <Row justify="center">
        {value}&nbsp;{symbol}
      </Row>
      <Spacer y={0.5} />
      <Row justify="center">${valueUSD}</Row>
    </>
  )
}
