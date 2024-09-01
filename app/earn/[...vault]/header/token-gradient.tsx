import styles from './token-gradient.module.scss'
import { TokenImage } from '@/components/token-image/TokenImage'
import type { TokenSymbol } from '@/types'

import './token-gradient-overrides.scss'
import { getTokenColorStyle } from '@/components/vault-card/token-helpers'

interface Props {
  symbol: TokenSymbol
}

export function TokenGradient({ symbol }: Props) {
  return (
    <div id="token-gradient" className={styles.container} style={{ ...getTokenColorStyle(symbol) }}>
      <div className={styles.imageWrapper}>
        <TokenImage symbol={symbol} width={450} height={450} />
      </div>
    </div>
  )
}
