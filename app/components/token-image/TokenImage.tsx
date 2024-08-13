import IconCoin from '../icons/icon-coin'
import type { TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
  width: number
  height: number
}

export function TokenImage({ symbol, ...restProps }: Props) {
  return <IconCoin symbol={symbol} noBackground {...restProps} />
}
