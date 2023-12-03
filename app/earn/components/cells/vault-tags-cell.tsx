import { Badge } from '@nextui-org/react'
import React from 'react'
import type { Vault } from '../../../api'

import styles from './vault-tags-cell.module.scss'

interface Props {
  vault: Vault
}

// TODO: We should keep this info at subgraph side (on even in the contract itself).
const STABLE_VAULTS = ['USDC', 'BUSD', 'USDT']

export const VaultTagsCell: React.FC<Props> = ({ vault }) => (
  <div className={styles.container}>
    <Badge variant="flat" disableOutline>
      VFT
    </Badge>
    {STABLE_VAULTS.includes(vault.asset.symbol) && <Badge variant="flat" disableOutline>Stable</Badge>}
    <Badge variant="flat" disableOutline>
      Low risk
    </Badge>
  </div>
)
