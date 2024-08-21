import type { Vault } from '../gql/graphql'
import type { TokenSymbol } from '@/types'
import { TokenOrder } from '@/types'

export function getAssetSymbol(vault: Vault): TokenSymbol {
  const name = vault.asset.symbol

  if (!TokenOrder.includes(name as TokenSymbol))
    throw new Error(`Unknown asset symbol: ${name}`)

  return name as TokenSymbol
}
