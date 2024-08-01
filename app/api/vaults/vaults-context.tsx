'use client'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'
import type { Vault } from '../gql/graphql'
import type { VaultsByChain } from './fetchVaults'
import { useFetchPositionInfo } from './use-fetch-position-info'
import { getAssetSymbol } from './get-asset-symbol'
import { useChainContext } from '@/shared/web3/chain-context'
import type { TokenSymbol } from '@/types'

export type VaultBySymbol = {
  [key in TokenSymbol]: Vault
}

export interface VaultsContextState {
  vaultsByChain?: VaultsByChain
  /** Current chain vaults */
  vaults: VaultBySymbol
}

const VaultsContext = createContext<VaultsContextState | undefined>(undefined)

export function useVaultsContext(): VaultsContextState {
  const context = useContext(VaultsContext)
  if (!context)
    throw new Error('useVaultsContext must be used within a VaultsProvider')

  return context
}

export interface VaultsProviderProps {
  vaultsByChain?: VaultsByChain
  /** Allow to specify only current chain vaults */
  currentChainVaults?: Array<Vault>
}

export const VaultsProvider: React.FC<PropsWithChildren<VaultsProviderProps>> = ({ vaultsByChain, currentChainVaults, children }) => {
  const { chainId } = useChainContext()
  const vaultsForChain = currentChainVaults ?? vaultsByChain?.[chainId]
  if (!vaultsForChain)
    throw new Error('Vaults for chain not found and not provided')

  const vaults = useMemo(() => mapVaultBySymbol(vaultsForChain), [chainId, vaultsForChain])

  useFetchPositionInfo(chainId, vaultsForChain)

  return (
        <VaultsContext.Provider value={{
          vaultsByChain,
          vaults,
        }}>
            {children}
        </VaultsContext.Provider>
  )
}

export function mapVaultBySymbol(vaults: Vault[]): VaultBySymbol {
  return vaults.reduce((map, vault) => {
    map[getAssetSymbol(vault)] = vault
    return map
  }, {} as VaultBySymbol)
}
