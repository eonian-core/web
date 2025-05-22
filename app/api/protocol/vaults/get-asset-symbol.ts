import type { TokenSymbol, Vault } from '@/types'
import { TokenOrder } from '@/types'

export function getAssetSymbol(vault: Vault): TokenSymbol {
  const name = vault.asset.symbol

  if (!TokenOrder.includes(name as TokenSymbol))
    throw new Error(`Unknown asset symbol: ${name}`)

  return name as TokenSymbol
}
