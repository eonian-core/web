'use client'

import styles from './token-gradient.module.scss'
import { TokenImage } from '@/components/token-image/TokenImage'
import type { TokenSymbol } from '@/types'

import './token-gradient-overrides.scss'
import { useTokenColor } from '@/components/vault-card/token'

interface Props {
  symbol: TokenSymbol
}

export function TokenGradient({ symbol }: Props) {
  const color = useTokenColor(symbol)
  return (
    <div id="token-gradient" className={styles.container} style={{ ...color }}>
      <div className={styles.imageWrapper}>
        <TokenImage symbol={symbol} width={450} height={450} />
      </div>
    </div>
  )
}
