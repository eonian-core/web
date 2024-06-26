import * as ethers from 'ethers'
import type { useSetChain } from '@web3-onboard/react'
import type { ConnectOptions, DisconnectOptions, EIP1193Provider, WalletState } from '@web3-onboard/core'
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
const cachedIcons: Record<string, string> = {}

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
    iconImageSrc: getWalletIconSrc(onboardWallet.icon),
  }
}

/**
 * Calculates the current connection status of the wallet.
 * @returns Wallet status.
 */
export function getStatus(isConnected: boolean, isConnecting: boolean): WalletStatus {
  if (isConnected)
    return WalletStatus.CONNECTED

  else if (isConnecting)
    return WalletStatus.CONNECTING

  else
    return WalletStatus.NOT_CONNECTED
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

/**
 * Returns ethers provider.
 * @param provider - The web3-onboard's provider.
 */
export function getProvider(provider: EIP1193Provider): ethers.BrowserProvider {
  return new ethers.BrowserProvider(provider, 'any')
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

/**
 * Disconnects from the connected wallet.
 */
export async function disconnect(walletLabel: string | null,
  onboardDisconnect: (wallet: DisconnectOptions) => Promise<WalletState[]>): Promise<void> {
  if (walletLabel)
    await onboardDisconnect({ label: walletLabel })

  WalletPersistance.removeWalletlabel()
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

function getWalletIconSrc(iconContent: string) {
  const cachedIconSrc = cachedIcons[iconContent]
  if (cachedIconSrc)
    return cachedIconSrc

  const svg = new Blob([iconContent], { type: 'image/svg+xml' })
  return (cachedIcons[iconContent] = URL.createObjectURL(svg))
}

export function getDefaultChain(chains: Chain[]): Chain {
  const chain = chains.find(chain => chain.isDefault)
  if (!chain)
    throw new Error('There must be at least one default chain')

  return chain
}
