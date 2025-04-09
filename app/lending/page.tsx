import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { showEarn } from '../features'

import styles from './page.module.scss'
import PageLoader from '@/components/page-loader/page-loader'

export default function Page() {
  if (!showEarn)
    redirect('/')

  return (
    <Suspense fallback={<PageLoader />}>
      <InnerPage />
    </Suspense>
  )
}

async function InnerPage() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return (
    <div className={styles.page}>
    </div>
  )
}
