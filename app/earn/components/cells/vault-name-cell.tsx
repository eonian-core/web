import React from 'react'
import type { Vault } from '../../../api'
import IconCoin from '../../../components/icons/icon-coin'
import { CellWithDescription } from './cell-with-description'

import styles from './vault-name-cell.module.scss'

interface Props {
  vault: Vault
}

export const VaultNameCell: React.FC<Props> = ({ vault }) => {
  return (
    <CellWithDescription icon={<IconCoin symbol={vault.asset.symbol} width="1.75em" height="1.75em" />}>
      <div className={styles.name}>
        {vault.asset.symbol}
      </div>
    </CellWithDescription>
  )
}
