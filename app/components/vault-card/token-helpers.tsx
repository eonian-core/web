import type { TokenSymbol } from '@/types'

export function getTokenColorStyle(token: TokenSymbol) {
  return { '--color-token': `var(--color-token-${token})` } as React.CSSProperties
}
