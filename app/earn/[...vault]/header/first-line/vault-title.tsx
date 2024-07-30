import { Chip } from '@nextui-org/react'
import styles from './vault-title.module.scss'
import type { TokenSymbol } from '@/types'
import IconCoin from '@/components/icons/icon-coin'
import { interFont } from '@/shared/fonts/Inter'
import { PropsWithChildren } from 'react'
import { DisplaySymbol } from '@/components/vault-card/display-symbol'

export function VaultTitle({children}: PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export interface VaultNameProps extends PropsWithChildren{
  symbol: TokenSymbol
}

const logoSize = 72

export function VaultName({ symbol, children }: VaultNameProps) {
  return (
    <div className={styles.info}>
      <IconCoin symbol={symbol} width={logoSize} height={logoSize} />
      <div className={styles.title}>
        <h1 className={interFont.className}>{children}</h1>
        <h2><DisplaySymbol>{symbol}</DisplaySymbol></h2>
      </div>
    </div>
  )
}

export function VaultTags({children}: PropsWithChildren) {
  return (
    <ul className={styles.tags}>
      {children}
    </ul>
  )
}

export const VaultTag = ({children}: PropsWithChildren) => (
  <li>
    <Chip variant="bordered" size="sm" className={styles.tag}>
      {children}
    </Chip>
  </li>
)