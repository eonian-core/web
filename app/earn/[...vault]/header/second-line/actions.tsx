import { Button } from '@nextui-org/react'
import styles from './actions.module.scss'
import IconExternal from '@/components/icons/icon-external'
import ExternalLink from '@/components/links/external-link'
import type { TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
}

export function Actions({ symbol }: Props) {
  const cmcPathLookup: Record<TokenSymbol, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDT: 'tether',
    USDC: 'usd-coin',
    DAI: 'multi-collateral-dai',
    BNB: 'bnb',
  }
  return (
    <div className={styles.container}>
      <ExternalLink href={`https://coinmarketcap.com/currencies/${cmcPathLookup[symbol]}/`}>
        <Button size="sm" variant="flat" radius="md" endContent={<IconExternal width="1em" height="1em" />}>
          Coin info
        </Button>
      </ExternalLink>
      <ExternalLink href="https://docs.eonian.finance/basics/how-eonian-works">
        <Button size="sm" variant="flat" radius="md" endContent={<IconExternal width="1em" height="1em" />}>
          How it works?
        </Button>
      </ExternalLink>
    </div>
  )
}
