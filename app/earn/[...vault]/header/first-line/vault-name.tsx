import type { PropsWithChildren } from 'react'
import styles from './vault-title.module.scss'
import { logoSize } from './vault-title-skeleton'
import type { TokenSymbol } from '@/types'
import IconCoin from '@/components/icons/icon-coin'
import { interFont } from '@/shared/fonts/Inter'
import { DisplaySymbol } from '@/components/vault-card/display-symbol'

export interface VaultNameProps extends PropsWithChildren {
  symbol: TokenSymbol
}

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
