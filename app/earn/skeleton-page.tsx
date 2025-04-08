import pageStyles from './page.module.scss'
import { Header } from './components/header'
import gridStyles from './components/vault-grid.module.scss'
import { VaultGridSkeleton } from './components/vault-grid-skeleton'

export default function SkeletonPage() {
  return (
    <div className={pageStyles.page}>
      <div>
        <div className={gridStyles.header}>
          <div>
            <Header />
          </div>
        </div>

        <VaultGridSkeleton />
      </div>
    </div>
  )
}
