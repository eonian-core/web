'use client';
import React, { createContext, useContext, PropsWithChildren, useMemo } from 'react';
import { Vault } from '../gql/graphql';
import { TokenOrder, TokenSymbol } from '@/types';
import { useChainContext } from '@/shared/web3/chain-context';
import { VaultsByChain } from './fetchVaults';
import { useFetchPositionInfo } from './use-fetch-position-info';

export type VaultBySymbol = {
    [key in TokenSymbol]: Vault
}

export interface VaultsContextState {
    vaultsByChain: VaultsByChain;
    /** Current chain vaults */
    vaults: VaultBySymbol
}

const VaultsContext = createContext<VaultsContextState | undefined>(undefined);

export const useVaultsContext = (): VaultsContextState => {
    const context = useContext(VaultsContext);
    if (!context) {
        throw new Error('useVaultsContext must be used within a VaultsProvider');
    }
    return context;
};

export const VaultsProvider: React.FC<PropsWithChildren<{vaultsByChain: VaultsByChain}>> = async ({ vaultsByChain, children }) => {
    const {chainId} = useChainContext()
    const vaultsForChain = vaultsByChain[chainId]
    const vaults = useMemo(() => mapVaultBySymbol(vaultsForChain), [chainId])

    useFetchPositionInfo(chainId, vaultsForChain)

    return (
        <VaultsContext.Provider value={{
            vaultsByChain,
            vaults
        }}>
            {children}
        </VaultsContext.Provider>
    );
};




export function mapVaultBySymbol(vaults: Vault[]): VaultBySymbol {
    return vaults.reduce((map, vault) => {
        map[getAssetSymbol(vault)] = vault
        return map
    }, {} as VaultBySymbol)
}


export function getAssetSymbol(vault: Vault): TokenSymbol {
    const name = vault.asset.symbol

    if (!TokenOrder.includes(name as TokenSymbol))
        throw new Error(`Unknown asset symbol: ${name}`)

    return name as TokenSymbol
}
