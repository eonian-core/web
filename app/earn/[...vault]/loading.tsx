'use client'

import { ContentSkeleton } from './content/content-skeleton'
import { HeaderSkeleton } from './header/header-skeleton'
import pageStyles from './page.module.scss'

export default function Loading() {
  return (
    <div className={pageStyles.page}>
      <HeaderSkeleton />
      <ContentSkeleton />
    </div>
  )
}
