import { SectionHeader, SectionSubHeader } from '../components/section-header'
import styles from './returns.module.scss'
import type { Vault } from '@/api'

interface Props {
  vault: Vault
}

export function Returns({ vault }: Props) {
  return (
    <div className={styles.container}>
      <SectionHeader title="Projected Returns">
        <SectionSubHeader>Based on last year APY</SectionSubHeader>
      </SectionHeader>
    </div>
  )
}
