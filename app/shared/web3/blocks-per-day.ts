import { ChainId } from '@/providers/wallet/wrappers/helpers'

const blocksPerDayLookupMap: Record<ChainId, number> = {
  [ChainId.SEPOLIA]: 6646, // https://eth-sepolia.blockscout.com/
  [ChainId.BSC_MAINNET]: 28732, // https://ycharts.com/indicators/binance_smart_chain_blocks_per_day
  [ChainId.UNKNOWN]: 0,
}

export function getBlocksPerDay(chainId: ChainId): number {
  return blocksPerDayLookupMap[chainId]
}
