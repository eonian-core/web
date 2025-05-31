import { useLendingState } from '../LendingState'
import { HeaderBase } from './HeaderBase'
import { getChainIcon } from '@/providers/wallet/wrappers/helpers'
import { NetworkSelectorBody } from '@/earn/components/network-selector'

function emptyFunction() {}

export function Header() {
  const { chainId, chainName } = useLendingState()
  return (
    <HeaderBase>
      <NetworkSelectorBody onClick={emptyFunction} icon={getChainIcon(chainId, 16)} disabled>
        {chainName}
      </NetworkSelectorBody>
    </HeaderBase>
  )
}
