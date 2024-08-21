import * as ethers from 'ethers'
import type { useSetChain } from '@web3-onboard/react'
import type { Chain as W3OChain } from '@web3-onboard/common'
import { SiweMessage } from 'siwe'
import type { ConnectOptions, DisconnectOptions, EIP1193Provider, WalletState } from '@web3-onboard/core'
import type { DependencyList } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { defaultChain } from '../../../web3-onboard'
import type { Chain, Wallet } from './types'
import { WalletStatus } from './types'
import {
  ChainId,
  WalletPersistance,
  getChainIcon,
  getDummyChain,
  getMulticallAddress,
  isLoggedInWallet,
} from './helpers'

type ChainArgs = ReturnType<typeof useSetChain>

const iconSize = 20

export function useWallet(onboardWallet: WalletState | null) {
  return useMemo(() => getWallet(onboardWallet), [onboardWallet])
}

/**
 * Returns the mapped "Web3Onboard" wallet, by default using the first active account.
 * @returns Current wallet state.
 */
export function getWallet(onboardWallet: WalletState | null): Wallet | null {
  const account = onboardWallet?.accounts?.[0]
  if (!account)
    return null

  return {
    label: onboardWallet.label,
    address: account.address,
    iconImageSrc: onboardWallet.icon,
  }
}

export function useStatus(isConnected: boolean, isConnecting: boolean) {
  return useMemo(() => getStatus(isConnected, isConnecting), [isConnected, isConnecting])
}

/**
 * Calculates the current connection status of the wallet.
 * @returns Wallet status.
 */
export function getStatus(isConnected: boolean, isConnecting: boolean): WalletStatus {
  if (isConnected)
    return WalletStatus.CONNECTED

  if (isConnecting)
    return WalletStatus.CONNECTING

  return WalletStatus.NOT_CONNECTED
}

export function useAvailableChains(onboardChains: W3OChain[]) {
  return useMemo(
    () => getAvailableChains(onboardChains.length === 0 ? [defaultChain as W3OChain] : onboardChains),
    [onboardChains],
  )
}

/**
 * Returns an array of enabled chains (mapped "Web3Onboard" chains).
 * @returns Array of available chains.
 */
export function getAvailableChains(onboardChains: ChainArgs[0]['chains']): Chain[] {
  return onboardChains.map((chain) => {
    const id = ChainId.parse(chain.id)
    return {
      id,
      icon: getChainIcon(id, iconSize),
      name: chain.label,
      isSupported: true,
      isDefault: chain.id === defaultChain.id,
      multicallAddress: getMulticallAddress(id),
    }
  })
}

export function useCurrentChain(chains: Chain[], chainId?: string) {
  return useMemo(() =>
    getCurrentChain(chains, chainId),
  [chains, chainId],
  )
}

/**
 * Finds and returns the currently active chain.
 * @returns Object of the selected chain.
 */
export function getCurrentChain(chains: Chain[], chainId?: string): Chain | null {
  if (!chainId)
    return null

  const id = ChainId.parse(chainId)
  return chains.find(chain => chain.id === id) ?? getDummyChain(id, iconSize)
}

export function useProvider(provider?: EIP1193Provider): ethers.BrowserProvider | null {
  return useMemo(() => (provider ? getProvider(provider) : null), [provider])
}

/**
 * Returns ethers provider.
 * @param provider - The web3-onboard's provider.
 */
export function getProvider(provider: EIP1193Provider): ethers.BrowserProvider {
  return new ethers.BrowserProvider(provider, 'any')
}

export function useConnect(chain: Chain | null,
  chains: Chain[],
  setOnboardChain: ChainArgs[1],
  onboardConnect: (options?: ConnectOptions) => Promise<WalletState[]>) {
  return useCallback(async () => {
    const success = await connect(onboardConnect)
    if (success)
      await autoSelectProperChain(chain, chains, setOnboardChain)
  },
  [chain, chains, onboardConnect, setOnboardChain],
  )
}

/**
 * Opens the model with wallet options.
 * @returns Label of the selected wallet.
 */
export async function connect(onboardConnect: (options?: ConnectOptions) => Promise<WalletState[]>): Promise<boolean> {
  try {
    const [wallet] = await onboardConnect()
    const walletLabel = wallet?.label
    if (!walletLabel)
      return false

    WalletPersistance.saveWalletLabel(walletLabel)
  }
  catch (e) {
    return false
  }
  return true
}

/**
 * Changes the current active chain if necessary.
 * Selects the last active network or fallbacks to the default value.
 * @returns "True" if the chain was successfully changed.
 */
export async function autoSelectProperChain(chain: Chain | null, chains: Chain[], setOnboardChain: ChainArgs[1]) {
  // Skip if the current active chain is supported.
  if (chain?.isSupported)
    return

  const lastActiveChainId = WalletPersistance.getLastActiveChain()
  const chainId = lastActiveChainId !== ChainId.UNKNOWN ? ChainId.parse(lastActiveChainId) : getDefaultChain(chains).id
  await setCurrentChain(chainId, setOnboardChain)
}

export function useRecconect(onboardConnect: (options?: ConnectOptions) => Promise<WalletState[]>) {
  return useEffect(() => {
    void reconnect(onboardConnect)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Reconnects to the specified wallet.
 * @param onboardConnect Wallet connect function.
 */
export async function reconnect(onboardConnect: (options?: ConnectOptions) => Promise<WalletState[]>): Promise<void> {
  // Do not reconnect if there is no information about the last connected wallet
  const walletLabel = WalletPersistance.getWalletLabel()
  if (!walletLabel)
    return

  // Do not try to connect to the wallet if the user is not logged in.
  const isLoggedIn = await isLoggedInWallet(walletLabel)
  if (!isLoggedIn)
    return

  await onboardConnect({
    autoSelect: { label: walletLabel, disableModals: true },
  })
}

export function useDisconnect(wallet: Wallet | null,
  onboardDisconnect: (wallet: DisconnectOptions) => Promise<WalletState[]>) {
  return useCallback(async () => {
    if (wallet)
      await disconnect(wallet?.label, onboardDisconnect)
  },
  [onboardDisconnect, wallet, wallet?.label],
  )
}

/**
 * Disconnects from the connected wallet.
 */
export async function disconnect(
  walletLabel: string | null,
  onboardDisconnect: (wallet: DisconnectOptions) => Promise<WalletState[]>,
): Promise<void> {
  if (walletLabel)
    await onboardDisconnect({ label: walletLabel })

  WalletPersistance.removeWalletlabel()
}

export function useSetCurrentChain(setOnboardChain: ChainArgs[1]) {
  return useCallback(
    async (chainId: ChainId) => {
      await setCurrentChain(chainId, setOnboardChain)
    },
    [setOnboardChain],
  )
}

/**
 * Sets the currently active network (chain).
 * @param chainId Identifier of the chain to which you need to connect.
 */
export async function setCurrentChain(chainId: ChainId, setOnboardChain: ChainArgs[1]): Promise<void> {
  const success = await setOnboardChain({ chainId: ChainId.toHex(chainId) })
  if (success)
    WalletPersistance.saveLastActiveChain(chainId)
}

export function getDefaultChain(chains: Chain[]): Chain {
  const chain = chains.find(chain => chain.isDefault)
  if (!chain)
    throw new Error('There must be at least one default chain')

  return chain
}

export function useSignMessage(provider: ethers.BrowserProvider | null) {
  return useCallback(async (chainId: ChainId, statement: string) => {
    return await signMessage(provider, chainId, statement)
  }, [provider])
}

export async function signMessage(provider: ethers.BrowserProvider | null, chainId: ChainId, statement: string): Promise<string | null> {
  const signer = await provider?.getSigner()
  if (!signer)
    return null

  const domain = window.location.host
  const origin = window.location.origin

  const message = new SiweMessage({
    domain,
    address: signer.address,
    statement,
    uri: origin,
    version: '1',
    chainId,
  })

  return await signer.signMessage(message.prepareMessage())
}

const SIGN_STATMENT = 'Sign in with wallet to Eonian'

export function useLoginThroughSign(provider: ethers.BrowserProvider | null, chainId?: ChainId) {
  return useProcessing(async (): Promise<string> => {
    if (!provider || !chainId)
      throw new Error('Sign login failed: wallet not connected')

    const signature = await signMessage(provider, chainId, SIGN_STATMENT)
    if (!signature)
      throw new Error('Sign login failed: cannot sign message')

    return signature
  }, [provider, chainId])
}

export function useProcessing<T extends Array<any> = [], R = any>(callback: (...args: T) => Promise<R>, deps: DependencyList): [(...args: T) => Promise<R>, boolean] {
  const [processing, setIsProcessing] = useState(false)

  const wrappedCallback = useCallback(async (...args: T) => {
    setIsProcessing(true)
    try {
      const result = await callback(...args)
      setIsProcessing(false)

      return result
    }
    catch (error) {
      console.error('Error during processing', error)
      setIsProcessing(false)
      throw error
    }
  }, deps)

  return [wrappedCallback, processing]
}
