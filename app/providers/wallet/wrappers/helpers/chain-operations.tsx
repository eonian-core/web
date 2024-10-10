import IconCoin from '../../../../components/icons/icon-coin'
import IconWarning from '../../../../components/icons/icon-warning'
import type { Chain } from '../types'
import { ChainId } from './wallet-chain-id'
import type { TokenSymbol } from '@/types'

export function getChainNativeToken(id: ChainId): string | null {
  const tokenLookupMap: Record<ChainId, string | null> = {
    [ChainId.SEPOLIA]: 'ETH',
    [ChainId.BSC_MAINNET]: 'BNB',
    [ChainId.UNKNOWN]: null,
  }
  return tokenLookupMap[id]
}

export function getChainNativeTokenTutorialLink(id: ChainId): string {
  const linkLookupMap: Record<ChainId, string | null> = {
    [ChainId.BSC_MAINNET]: 'https://www.binance.com/en/how-to-buy/bnb',
    [ChainId.SEPOLIA]: null,
    [ChainId.UNKNOWN]: null,
  }
  return linkLookupMap[id] ?? 'https://portfolio.metamask.io/buy/build-quote'
}

export function getChainIcon(id: ChainId, iconSize: number): React.ReactNode {
  const iconLookupMap: Record<ChainId, TokenSymbol | null> = {
    [ChainId.SEPOLIA]: 'ETH',
    [ChainId.BSC_MAINNET]: 'BNB',
    [ChainId.UNKNOWN]: null,
  }
  const icon = iconLookupMap[id]
  if (icon === null)
    return <IconWarning width={iconSize} height={iconSize} />

  return <IconCoin symbol={icon} width={iconSize} height={iconSize} />
}

export function getChainExplorer(id: ChainId): string | null {
  switch (id) {
    case ChainId.SEPOLIA:
      return 'https://sepolia.etherscan.io'
    case ChainId.BSC_MAINNET:
      return 'https://bscscan.com'
    case ChainId.UNKNOWN:
      return null
  }
}

/**
 * See https://www.multicall3.com/deployments
 * @param id - Chain id
 * @returns Multicall address for the specified chain
 */
export function getMulticallAddress(id: ChainId): string {
  switch (id) {
    case ChainId.SEPOLIA:
    case ChainId.BSC_MAINNET:
      return '0xcA11bde05977b3631167028862bE2a173976CA11'
    case ChainId.UNKNOWN:
      return '0x0'
  }
}

/**
 * Returns RPC URL endpoint for specific chain id.
 * @param id - Chain id
 * @returns String URL or null
 */
export function getRPCEndpoint(id: ChainId): string | undefined {
  switch (id) {
    case ChainId.SEPOLIA:
      return process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
    case ChainId.BSC_MAINNET:
      return process.env.NEXT_PUBLIC_BSC_MAINNET_RPC_URL || 'https://bsc-dataseed1.binance.org/'
    case ChainId.UNKNOWN:
      return undefined
  }
}

export function getDummyChain(id: ChainId, iconSize: number): Chain {
  return {
    id,
    icon: getChainIcon(ChainId.UNKNOWN, iconSize),
    isSupported: false,
    isDefault: false,
    multicallAddress: getMulticallAddress(ChainId.UNKNOWN),
  }
}
