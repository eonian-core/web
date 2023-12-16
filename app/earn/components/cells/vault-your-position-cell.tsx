import { Tooltip } from '@nextui-org/react'
import React from 'react'
import type { Vault } from '../../../api'
import Button from '../../../components/button/button'
import IconWarning from '../../../components/icons/icon-warning'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { toUSDValue } from '../../../shared'
import { useAppSelector } from '../../../store/hooks'
import { CellWithCurrency } from './cell-with-currency'

import styles from './vault-your-position-cell.module.scss'

interface Props {
  vault: Vault
}

export const VaultYouPositionCell: React.FC<Props> = ({ vault }) => {
  const { status } = useWalletWrapperContext()
  const { isLoading: isPositionLoading, errors } = useAppSelector(state => state.positionInfo)

  const error = typeof errors === 'string' ? errors : errors[vault.address]
  const isWalletConnecting = status === WalletStatus.CONNECTING
  const isWalletNotConnected = status === WalletStatus.NOT_CONNECTED

  const isLoading = isPositionLoading || isWalletConnecting

  const showError = !!error
  const showConnect = !showError && isWalletNotConnected
  const showContent = !showError && !showConnect

  return (
    <div className={styles.container}>
      {showError && <Error error={error} />}
      {showConnect && <ConnectButton />}
      {showContent && <Content vault={vault} isLoading={isLoading} />}
    </div>
  )
}

function Content({ vault, isLoading }: Props & { isLoading: boolean }) {
  const { vaultBalances } = useAppSelector(state => state.positionInfo)
  const { symbol: assetSymbol, decimals } = vault.asset
  const balance = vaultBalances[vault.address] ?? 0n
  const { value: price, decimals: priceDecimals } = vault.asset.price
  return (
    <CellWithCurrency
      value={balance}
      decimals={decimals}
      valueUSD={toUSDValue(balance, decimals, price)}
      decimalsUSD={priceDecimals}
      symbol={assetSymbol}
      isLoading={isLoading}
    />
  )
}

function ConnectButton() {
  const { connect } = useWalletWrapperContext()

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    void connect()
  }

  return (
    <Button bordered size="sm" onClick={handleClick}>
      Connect
    </Button>
  )
}

function Error({ error }: { error: string }) {
  return (
    <Tooltip content={error} className={styles.tooltip}>
      <IconWarning width="1.5em" height="1.5em" />
    </Tooltip>
  )
}
