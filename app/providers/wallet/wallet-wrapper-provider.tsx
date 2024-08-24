'use client'

import { Web3OnboardProvider, useConnectWallet, useSetChain } from '@web3-onboard/react'
import type { ethers } from 'ethers'
import React, { useContext, useEffect } from 'react'
import web3Onboard from '../../web3-onboard'
import { useMonitoringContext } from '../monitoring'
import type { ChainId } from './wrappers/helpers'
import type { Chain, Wallet } from './wrappers/types'
import { WalletStatus } from './wrappers/types'
import type { SignedMessage } from './wrappers/w3o-wallet-wrapper'
import { useAvailableChains, useConnect, useCurrentChain, useDisconnect, useLoginThroughSign, useProvider, useRecconect, useSetCurrentChain, useSignMessage, useStatus, useWallet } from './wrappers/w3o-wallet-wrapper'

interface Props {
  children: React.ReactNode
}

export interface WalletWrapperContextValue {
  wallet: Wallet | null
  status: WalletStatus
  chain: Chain | null
  chains: Chain[]
  provider: ethers.BrowserProvider | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  setCurrentChain: (chainId: ChainId) => Promise<void>
  signMessage: (chainId: ChainId, statement: string, nonce: string) => Promise<SignedMessage | null>
  loginThroughSign: () => Promise<string>
  loggingIn: boolean
}

export const WalletWrapperContext = React.createContext<WalletWrapperContextValue>({
  wallet: null,
  status: WalletStatus.NOT_CONNECTED,
  chain: null,
  chains: [],
  provider: null,
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
  setCurrentChain: () => Promise.resolve(),
  signMessage: () => Promise.resolve(null),
  loginThroughSign: () => new Promise((resolve, reject) => { reject(new Error('Not connected')) }),
  loggingIn: false,
})

/**
 * Provides all Web3-related info and functions (wallet, active chain, connection status, etc).
 * Used as a wrapper for the currently used web3 library, which will allow us to easily and painlessly switch to a new library in the future (if we want to).
 */
const WalletWrapperImplementationProvider: React.FC<Props> = ({ children }) => {
  const [{ wallet: onboardWallet, connecting }, onboardConnect, onboardDisconnect] = useConnectWallet()
  const provider = useProvider(onboardWallet?.provider)

  const wallet = useWallet(onboardWallet)
  const isWalletConnected = !!wallet
  const status = useStatus(isWalletConnected, connecting)

  const disconnect = useDisconnect(wallet, onboardDisconnect)

  const [{ chains: onboardChains, connectedChain }, setOnboardChain] = useSetChain()
  const chains = useAvailableChains(onboardChains)
  const chain = useCurrentChain(chains, connectedChain?.id)

  const connect = useConnect(chain, chains, setOnboardChain, onboardConnect)
  const setCurrentChain = useSetCurrentChain(setOnboardChain)

  useRecconect(onboardConnect)

  const { identify } = useMonitoringContext()
  useEffect(() => {
    if (!wallet)
      return

    const { address, label } = wallet
    identify(address, { address, label })
  }, [identify, wallet])

  const signMessage = useSignMessage(provider)
  const [loginThroughSign, loggingIn] = useLoginThroughSign(provider, chain?.id)

  return <WalletWrapperContext.Provider value={{
    wallet,
    status,
    chain,
    chains,
    provider,
    connect,
    disconnect,
    setCurrentChain,
    signMessage,
    loginThroughSign,
    loggingIn,
  }}>{children}</WalletWrapperContext.Provider>
}

export const WalletWrapperProvider: React.FC<Props> = ({ children }) => (
  <Web3OnboardProvider web3Onboard={web3Onboard}>
    <WalletWrapperImplementationProvider>{children}</WalletWrapperImplementationProvider>
  </Web3OnboardProvider>
)

export const useWalletWrapperContext = () => useContext(WalletWrapperContext)
