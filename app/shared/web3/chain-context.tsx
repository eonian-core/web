'use client';
import { ChainId } from "@/providers/wallet/wrappers/helpers"
import { defaultChain } from "@/web3-onboard";
import { PropsWithChildren, createContext, useContext, useState } from "react";


/** Provides current chain that can be switched by user */
export interface ChainContextState {
    /** Current chain id */
    chainId: ChainId,
    /** Current chain name */
    chainName: string
    setChainId: (chain: ChainId) => void
}

const ChainContext = createContext<ChainContextState | undefined>(undefined);

export const useChainContext = (): ChainContextState => {
    const context = useContext(ChainContext);
    if (!context) {
        throw new Error('useChainContext must be used within a ChainProvider');
    }
    return context;
};

export const ChainProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const defaultChainId = ChainId.parse(defaultChain.id)
    const [chainId, setChainId] = useState(defaultChainId)

    return (
        <ChainContext.Provider value={{
            chainId,
            setChainId,
            chainName: ChainId.getName(chainId).toLowerCase(),
        }}>
            {children}
        </ChainContext.Provider>
    );
};