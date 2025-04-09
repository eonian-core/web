'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'

import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import styles from './wallet-network-selector.module.scss'

function WalletNetworkSelector() {
  const { chain, chains, setCurrentChain } = useWalletWrapperContext()

  const handleSelectionChanged = React.useCallback(
    (keys: 'all' | Set<string | number>) => {
      const set = keys as Set<string>
      const [id] = Array.from(set)
      void setCurrentChain(+id)
    },
    [setCurrentChain],
  )

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" className={styles.network} variant='light'>
          {chain?.icon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[String(chain?.id)]}
        onSelectionChange={handleSelectionChanged}
      >
        {chains.map(chain => (
          <DropdownItem key={chain?.id} startContent={chain?.icon}>
            {chain?.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default WalletNetworkSelector
