import { Spacer, Spinner, Tooltip } from '@nextui-org/react'
import type { Vault } from '../../../api'
import CompactNumber from '../../../components/compact-number/compact-number'
import { useAppSelector } from '../../../store/hooks'
import { toStringNumberFromDecimals, toUSDValue } from '../../../shared'
import { Row } from '../../../components/row/Row'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'

interface Props {
  vault: Vault
}

export function VaultUserBalance({ vault }: Props) {
  const { status: walletStatus } = useWalletWrapperContext()
  const { vaultBalances, isLoading, errors } = useAppSelector(state => state.positionInfo)
  const { symbol: assetSymbol, decimals } = vault.asset
  const balance = vaultBalances[vault.address] ?? 0n
  const { value: price, decimals: priceDecimals } = vault.asset.price
  const error = typeof errors === 'string' ? errors : errors[vault.address]
  return (
    (walletStatus === WalletStatus.CONNECTING || isLoading || error) ? <Loader /> : <Value />
  )

  function Value() {
    return (
      <Tooltip content={<TooltipContent />}>
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

  function Loader() {
    return <Spinner size="sm" />
  }

  function TooltipContent() {
    const valueAccurate = toStringNumberFromDecimals(balance, decimals)
    const valueUSDAccurate = toStringNumberFromDecimals(toUSDValue(balance, decimals, price), priceDecimals)
    return (
      <>
        <Row justify="center">
          {valueAccurate}&nbsp;{assetSymbol}
        </Row>
        <Spacer y={0.5} />
        <Row justify="center">${valueUSDAccurate}</Row>
      </>
    )
  }
}
