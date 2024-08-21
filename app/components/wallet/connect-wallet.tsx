'use client'

import React from 'react'
import Button from '../button/button'
import { InternalLink } from '../links/links'
import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../providers/wallet/wrappers/types'
import WalletInfo from './wallet-info'

function ConnectWallet() {
  const { status, connect } = useWalletWrapperContext()

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      void connect()
    },
    [connect],
  )

  if (status === WalletStatus.CONNECTED)
    return <WalletInfo />

  return (
    <InternalLink href={'/earn'} onClick={handleClick}>
      <Button id="connect-button" bordered>{status === WalletStatus.CONNECTING ? 'Connecting...' : 'Connect'}</Button>
    </InternalLink>
  )
}

export default ConnectWallet
