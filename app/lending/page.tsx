import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { showLending } from '../features'
import SkeletonPage from './skeleton-page'

// Dynamically import Content with SSR disabled
const DynamicInnerPage = dynamic(() => import('./content'), {
  ssr: false,
  loading: () => <SkeletonPage />,
})

export default function Page() {
  if (!showLending)
    redirect('/')

  return <DynamicInnerPage />
}
