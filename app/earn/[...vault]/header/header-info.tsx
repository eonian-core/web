import { Button, Chip } from '@nextui-org/react'
import styles from './header-info.module.scss'
import type { TokenSymbol } from '@/types'
import IconCoin from '@/components/icons/icon-coin'
import { getVaultName } from '@/earn/components/vault-card/vault-card-features'
import ExternalLink from '@/components/links/external-link'
import IconExternal from '@/components/icons/icon-external'
import { interFont } from '@/shared/fonts/Inter'

interface Props {
  symbol: TokenSymbol
}

export function HeaderInfo({ symbol }: Props) {
  return (
    <div className={styles.container}>
      <Tags />
      <Info symbol={symbol} />
      <Actions symbol={symbol} />
    </div>
  )
}

function Info({ symbol }: Props) {
  const logoSize = 72
  return (
    <div className={styles.info}>
      <IconCoin symbol={symbol} width={logoSize} height={logoSize} />
      <div className={styles.title}>
        <h1 className={interFont.className}>{getVaultName(symbol)}</h1>
        <h2>{symbol}</h2>
      </div>
    </div>
  )
}

function Actions({ symbol }: Props) {
  const cmcPathLookup: Record<TokenSymbol, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDT: 'tether',
    USDC: 'usd-coin',
    DAI: 'multi-collateral-dai',
    BNB: 'bnb',
  }
  return (
    <div className={styles.actions}>
      <ExternalLink href={`https://coinmarketcap.com/currencies/${cmcPathLookup[symbol]}/`}>
        <Button size="sm" variant="flat" radius="md" endContent={<IconExternal width="1em" height="1em" />}>
          Coin info
        </Button>
      </ExternalLink>
      <ExternalLink href="https://docs.eonian.finance/basics/how-eonian-works">
        <Button size="sm" variant="flat" radius="md" endContent={<IconExternal width="1em" height="1em" />}>
          How vault works
        </Button>
      </ExternalLink>
    </div>
  )
}

function Tags() {
  return (
    <ul className={styles.tags}>
      <li>
        <Chip variant="bordered" size="sm" className={styles.tag}>
          Popular
        </Chip>
      </li>
      <li>
        <Chip variant="bordered" size="sm" className={styles.tag}>
          Tested
        </Chip>
      </li>
      <li>
        <Chip variant="bordered" size="sm" className={styles.tag}>
          Insured
        </Chip>
      </li>
    </ul>
  )
}
