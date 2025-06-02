import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { showLending } from '../features'
import { LendingPageSkeleton } from './components/LendingPage.skeleton'

// Dynamically import Content with SSR disabled
const DynamicInnerPage = dynamic(() => import('./LendingContent'), {
  ssr: false,
  loading: () => (
    <div>
      <LendingPageSkeleton />
    </div>
  ),
})

export default function Page() {
  if (!showLending)
    redirect('/')

  return <DynamicInnerPage />
}
