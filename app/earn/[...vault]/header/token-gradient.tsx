import styles from './token-gradient.module.scss'
import { TokenImage } from '@/components/token-image/TokenImage'
import type { TokenSymbol } from '@/types'

import './token-gradient-overrides.scss'

interface Props {
  symbol: TokenSymbol
}

export function TokenGradient({ symbol }: Props) {
  const color = { '--color-token': `var(--color-token-${symbol})` } as React.CSSProperties
  return (
    <div id="token-gradient" className={styles.container} style={color}>
      <div className={styles.imageWrapper}>
        <TokenImage symbol={symbol} width={450} height={450} />
      </div>
    </div>
  )
}
