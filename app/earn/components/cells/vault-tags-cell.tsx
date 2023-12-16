import React from 'react'
import type { Vault } from '../../../api'

import styles from './vault-tags-cell.module.scss'
import { CellChip } from './cell-chip'

interface Props {
  vault: Vault
}

// TODO: We should keep this info at subgraph side (on even in the contract itself).
const STABLE_VAULTS = ['USDC', 'BUSD', 'USDT']

export const VaultTagsCell: React.FC<Props> = ({ vault }) => (
  <div className={styles.container}>
    <CellChip>
      VFT
    </CellChip>
    {STABLE_VAULTS.includes(vault.asset.symbol) && <CellChip>Stable</CellChip>}
    <CellChip>
      Low risk
    </CellChip>
  </div>
)
