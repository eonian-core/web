'use client'

import { useParams } from 'next/navigation'
import { TokenGradient } from './token-gradient'
import { TokenOrder } from '@/types'

export function TokenGradientSkeleton() {
  const { vault } = useParams<{ vault: [string, string] }>()
  const [, vaultSymbol] = vault
  if (!vaultSymbol)
    return null

  const symbol = TokenOrder.find(symbol => vaultSymbol.includes(symbol))
  if (!symbol)
    return null

  return <TokenGradient symbol={symbol} />
}
