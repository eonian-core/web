import React from 'react'
import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'

import styles from './network-selector.module.scss'
import { useChainContext } from '@/shared/web3/chain-context'
import Button from '@/components/button/button'
import { useSuggestChainContext } from '@/views/suggest-chain-drawer/suggest-chain-drawer'

export const NetworkSelector: React.FC = () => {
  const { chainId: value } = useChainContext()
  const { chains } = useWalletWrapperContext()
  const chain = chains.find(({ id }) => id === value)

  const { open } = useSuggestChainContext()

  return (<div className={styles.wrapper}>

    <Button bordered dark round onClick={open} icon={chain?.icon} iconPosition='left'>{chain?.name}</Button>

  </div>)
}
