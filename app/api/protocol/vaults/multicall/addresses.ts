import { ChainId } from '@/providers/wallet/wrappers/helpers'
import type { TokenSymbol } from '@/types'

const vaultAddresses: Partial<Record<ChainId, string[]>> = {
  [ChainId.BSC_MAINNET]: [
    '0x03A49bc893bBBEec9181b02C2D6abD6eb8e10311', // ETH
    '0x33C29951844aAa19524F51177cF725D6A0D720d4', // BTCB
    '0xaBfCaA1c65d78C2f1D51fd796290029f976192B3', // USDT
    '0x5340f5a1B7b847Ae71865D2D7B200dc8a06a9ffC', // USDC
  ],
}

const chainLinkPriceFeedAddresses: Partial<Record<ChainId, Partial<Record<TokenSymbol, string>>>> = {
  [ChainId.BSC_MAINNET]: {
    ETH: '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
    BTCB: '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf',
    USDT: '0xB97Ad0E74fa7d920791E90258A6E2085088b4320',
    USDC: '0x51597f405303C4377E36123cBc172b13269EA163',
  },
}

export function getVaultAddresses(chainId: ChainId): string[] {
  const addresses = vaultAddresses[chainId]
  if (!addresses)
    throw new Error(`Vault addresses for chain ${chainId} are not found`)

  return addresses
}

export function getChainLinkPriceFeedAddresses(chainId: ChainId, token: TokenSymbol): string {
  const priceFeedAddress = chainLinkPriceFeedAddresses[chainId]?.[token]
  if (!priceFeedAddress)
    throw new Error(`Price feed address for ${token} on chain ${chainId} is not found`)

  return priceFeedAddress
}
