import { TokenAction } from './token'
import { useVaultsContext } from '@/api/protocol/vaults/vaults-context'
import { useChainContext } from '@/shared/web3/chain-context'
import type { TokenSymbol } from '@/types'

export function VaultAction({ symbol }: { symbol: TokenSymbol }) {
  const { chainName } = useChainContext()
  const { vaults } = useVaultsContext()
  const vault = vaults[symbol]
  if (!vault)
    return null

  return (
    <TokenAction
      href={`/earn/${chainName}/${vault.symbol}`}
      >Save</TokenAction>
  )
}
