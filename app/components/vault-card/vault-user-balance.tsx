import { Spacer, Spinner, Tooltip } from '@nextui-org/react'
import type { Vault } from '../../api'
import CompactNumber from '../compact-number/compact-number'
import { useAppSelector } from '../../store/hooks'
import { toStringNumberFromDecimals } from '../../shared'
import { Row } from '../row/Row'
import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../providers/wallet/wrappers/types'
import { toUSDValue } from '@/finances/humanize'

export interface VaultUserBalanceProps {
  vault: Vault
}

export function VaultUserBalance({ vault }: VaultUserBalanceProps) {
  const { status: walletStatus } = useWalletWrapperContext()
  const { vaultBalances, isLoading, errors } = useAppSelector(state => state.positionInfo)
  const error = typeof errors === 'string' ? errors : errors[vault.address]
  if (walletStatus === WalletStatus.CONNECTING || isLoading || error)
    return <Loader />

  return <Value
    symbol={vault.asset.symbol}
    balance={vaultBalances[vault.address] ?? 0n}
    decimals={vault.asset.decimals}
    price={vault.asset.price.value}
    priceDecimals={vault.asset.price.decimals}
  />
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
    <Tooltip content={<TooltipContent
      value={valueAccurate}
      valueUSD={valueUSDAccurate}
      symbol={symbol}
      />
      }>
      <div>
        <CompactNumber
          value={balance}
          decimals={decimals}
          fractionDigits={2}
          hideTooltip
          childrenAtStart={false}
        />
      </div>
    </Tooltip>
  )
}

// TODO: switch to skeleton loader
function Loader() {
  return <Spinner size="sm" />
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