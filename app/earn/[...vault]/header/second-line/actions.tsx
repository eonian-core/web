import { Button } from '@heroui/react'
import clsx from 'clsx'
import styles from './actions.module.scss'
import IconExternal from '@/components/icons/icon-external'
import ExternalLink from '@/components/links/external-link'
import type { TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
  className?: string
}

export function Actions({ symbol, className = styles.hideOnMobile }: Props) {
  const cmcPathLookup: Record<TokenSymbol, string> = {
    BTCB: 'bitcoin',
    ETH: 'ethereum',
    USDT: 'tether',
    USDC: 'usd-coin',
    DAI: 'multi-collateral-dai',
    BNB: 'bnb',
  }
  return (
    <div className={clsx(styles.container, className)}>
      <ExternalAction href={`https://coinmarketcap.com/currencies/${cmcPathLookup[symbol]}/`}>
        More info
      </ExternalAction>
    </div>
  )
}

export interface ExternalActionProps {
  href: string
  children: React.ReactNode
}

export function ExternalAction({ href, children }: ExternalActionProps) {
  return (
    <ExternalLink href={href}>
      <Button size="sm" variant="light" radius="md" endContent={<IconExternal width="1.3em" height="1.3em" />}>
        {children}
      </Button>
    </ExternalLink>
  )
}
