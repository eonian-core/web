import { Tooltip } from '@heroui/react'
import type { FC } from 'react'
import styles from './display-symbol.module.scss'
import type { TokenSymbol } from '@/types'

/** Converts real token symbol to symbol that understandable by human */
export const DisplaySymbol: FC<{ children: TokenSymbol }> = ({ children: symbol }) =>
  <Tooltip content={`Represented as ${symbol} token on the current chain`}>
    <div className={styles.content}>
      <SymbolContent>{symbol}</SymbolContent>
    </div>
  </Tooltip>

export function SymbolContent({ children: symbol }: { children: TokenSymbol }) {
  if (symbol === 'BTCB')
    return 'BTC'

  return symbol
}
