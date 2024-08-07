import { VaultTags, VaultTitle } from './vault-title'
import styles from './vault-title.module.scss'
import { CircleSkeleton, OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function VaultTitleSkeleton() {
  return <VaultTitle>
        <VaultTags>
            <li><OneLineSkeleton /></li>
            <li><OneLineSkeleton /></li>
            <li><OneLineSkeleton /></li>
            <li><OneLineSkeleton /></li>
            <li><OneLineSkeleton /></li>
        </VaultTags>

        <VaultNameSkeleton />
    </VaultTitle>
}

export const logoSize = 58

export function VaultNameSkeleton() {
  return (
        <div className={styles.info}>
            <CircleSkeleton width={logoSize} height={logoSize}/>
            <div className={styles.title}>
                <h1><OneLineSkeleton width={180} height={40}/></h1>
                <h2><OneLineSkeleton width={50} height={32}/></h2>
            </div>
        </div>
  )
}
