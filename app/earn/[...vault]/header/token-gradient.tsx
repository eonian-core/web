import styles from './token-gradient.module.scss'
import { TokenImage } from '@/components/token-image/TokenImage'
import type { TokenSymbol } from '@/types'

import './token-gradient-overrides.scss'

interface Props {
  symbol: TokenSymbol
}

export function TokenGradient({ symbol }: Props) {
  return (
    <div id="token-gradient" className={styles.container}>
      <div className={styles.imageWrapper}>
        <TokenImage symbol={symbol} width={256} height={256} />
      </div>
    </div>
  )
}
