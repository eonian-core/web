'use client'

import React from 'react'
import { JsonRpcProvider } from 'ethers'
import type { Vault } from '../../api'
import { H2, H3 } from '../../components/heading/heading'
import { ChainId, getRPCEndpoint } from '../../providers/wallet/wrappers/helpers'
import { defaultChain } from '../../web3-onboard'

import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import { useAppDispatch } from '../../store/hooks'
import { fetchPositionInfo } from '../../store/slices/positionInfoSlice'
import { TokenOrder } from '../../(landing)/views/offer/token'
import styles from './vault-grid.module.scss'
import { NetworkSelector } from './network-selector'
import { BaseVaultCard, VaultCard } from './vault-card/vault-card'
import { getAssetSymbol } from './vault-card/vault-card-features'

export type VaultsByChain = Record<ChainId, Vault[]>

interface Props {
  vaultsByChain: VaultsByChain
}

export function VaultGrid({ vaultsByChain }: Props) {
  const defaultChainId = ChainId.parse(defaultChain.id)
  const [chainId, setChainId] = React.useState(defaultChainId)
  const chainName = ChainId.getName(chainId).toLowerCase()
  const vaults = sortVaults(vaultsByChain[chainId])

  useFetchPositionInfo(chainId, vaults)

  return (
    <div>
      <div className={styles.header}>
        <div>
          <H2>Select Cryptocurrency</H2>
          <H3>Choose an asset to save and generate passive income</H3>
        </div>
        <NetworkSelector value={chainId} onChange={setChainId} />
      </div>
      <div className={styles.cards}>
        {vaults.map(vault => (
          <VaultCard chainName={chainName} key={vault.address} vault={vault} />
        ))}
        {chainId === ChainId.BSC_MAINNET && <ComingSoonBNBVaults />}
      </div>
    </div>
  )
}

function sortVaults(vaults: Vault[]): Vault[] {
  return [...vaults].sort((a, b) => TokenOrder.indexOf(getAssetSymbol(a)) - TokenOrder.indexOf(getAssetSymbol(b)))
}

function ComingSoonBNBVaults() {
  return (
    <>
      <BaseVaultCard symbol="BNB" apy={3} growth={143.5} buttonLabel="Coming soon" />
      <BaseVaultCard symbol="DAI" apy={10} growth={0} buttonLabel="Coming soon" />
    </>
  )
}

/**
 * Gets the user's invested position in each vault in the list.
 * @param chainId The ID of the currently selected chain.
 * @param vaults A list of vaults from which to get the position.
 */
function useFetchPositionInfo(chainId: ChainId, vaults: Vault[]) {
  const { wallet, chain, provider } = useWalletWrapperContext()
  const walletAddress = wallet?.address
  const multicallAddress = chain?.multicallAddress
  const dispatch = useAppDispatch()

  const callback = () => {
    if (!multicallAddress || !walletAddress || !provider || vaults.length === 0) {
      return
    }

    const endpoint = getRPCEndpoint(chainId)
    if (!endpoint) {
      return
    }

    void dispatch(
      fetchPositionInfo({
        walletAddress,
        vaultAddresses: vaults.map(vault => vault.address),
        multicallAddress,
        provider: new JsonRpcProvider(endpoint),
      }),
    )
  }

  React.useEffect(callback, [vaults, chainId, dispatch, provider, multicallAddress, walletAddress])
}
