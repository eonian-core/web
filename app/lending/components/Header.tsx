import { useLendingState } from '../LendingState'
import styles from './Header.module.scss'
import { getChainIcon } from '@/providers/wallet/wrappers/helpers'
import { NetworkSelectorBody } from '@/earn/components/network-selector'
import { H2, H3 } from '@/components/heading/heading'

function emptyFunction() {}

export function Header() {
  const { chainId, chainName } = useLendingState()
  return (
    <div className={styles.container}>
      <div>
        <H2>Supply to Borrow</H2>
        <H3>Supply collateral to earn yield and borrow against it</H3>
      </div>
      <NetworkSelectorBody onClick={emptyFunction} icon={getChainIcon(chainId, 16)} disabled>
        {chainName}
      </NetworkSelectorBody>
    </div>
  )
}
