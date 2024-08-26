import type { PropsWithChildren } from 'react'
import styles from './vault-title.module.scss'

import { Tag } from '@/components/chip/tag'

export function VaultTitle({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>
}

export function VaultTags({ children }: PropsWithChildren) {
  return <div className={styles.tagsCntainer}><ul className={styles.tags}>{children}</ul></div>
}

export function VaultTag({ children }: PropsWithChildren) {
  return (
    <li>
      <Tag>{children}</Tag>
    </li>
  )
}
