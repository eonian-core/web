'use client'

import { useParams } from 'next/navigation'
import { ContentSkeleton } from './content/content-skeleton'
import { HeaderSkeleton } from './header/header-skeleton'
import pageStyles from './page.module.scss'
import { TokenGradient } from './header/token-gradient'
import { TokenOrder } from '@/types'

export default function Loading() {
  return (
    <div className={pageStyles.page}>
      <TokenGradientSkeleton />
      <HeaderSkeleton />
      <ContentSkeleton />
    </div>
  )
}

function TokenGradientSkeleton() {
  const { vault } = useParams<{ vault: [string, string] }>()
  const [, vaultSymbol] = vault
  if (!vaultSymbol)
    return null

  const symbol = TokenOrder.find(symbol => vaultSymbol.includes(symbol))
  if (!symbol)
    return null

  return <TokenGradient symbol={symbol} />
}
