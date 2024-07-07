import { Button, Chip } from '@nextui-org/react'
import styles from './header-info.module.scss'
import type { TokenSymbol } from '@/types'
import IconCoin from '@/components/icons/icon-coin'
import { getVaultName } from '@/earn/components/vault-card/vault-card-features'
import { interFont } from '@/shared/fonts/Inter'

interface Props {
  symbol: TokenSymbol
}

export function HeaderInfo({ symbol }: Props) {
  return (
    <div className={styles.container}>
      <Tags />
      <Info symbol={symbol} />
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
