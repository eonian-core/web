import { ContentSkeleton } from './content/content-skeleton'
import { HeaderSkeleton } from './header/header-skeleton'
import pageStyles from './page.module.scss'
import { TokenGradientSkeleton } from './header/token-gradient-skeleton'

export default function SkeletonPage() {
  return (
    <div className={pageStyles.page}>
      <TokenGradientSkeleton />
      <HeaderSkeleton />
      <ContentSkeleton />
    </div>
  )
}
