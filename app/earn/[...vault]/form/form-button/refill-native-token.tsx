import styles from './refill-native-token.module.scss'
import IconExternal from '@/components/icons/icon-external'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import { getChainNativeToken } from '@/providers/wallet/wrappers/helpers'

interface Props {
  chainId: ChainId
}

export function RefillNativeToken({ chainId }: Props) {
  const tokenName = getChainNativeToken(chainId) ?? 'native token'
  return (
    <div>
      <div>Not enough funds to pay the transaction fee.</div>
      <div className={styles.cta}>
        Refill your {tokenName} balance
        <IconExternal />
      </div>
    </div>
  )
}
