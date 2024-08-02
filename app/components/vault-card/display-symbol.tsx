import { Tooltip } from '@nextui-org/react'
import type { FC } from 'react'
import styles from './display-symbol.module.scss'
import type { TokenSymbol } from '@/types'

/** Converts real token symbol to symbol that understandable by human */
export const DisplaySymbol: FC<{ children: TokenSymbol }> = ({ children: symbol }) =>
  <Tooltip content={`On current chain represented as ${symbol} token`}>
    <div className={styles.content}>
      <SymbolContent>{symbol}</SymbolContent>
    </div>
  </Tooltip>

export function SymbolContent({ children: symbol }: { children: TokenSymbol }) {
  if (symbol === 'BTCB')
    return 'BTC'

  return symbol
}
