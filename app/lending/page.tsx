import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Spinner } from '@heroui/react'
import { showLending } from '../features'

// Dynamically import Content with SSR disabled
const DynamicInnerPage = dynamic(() => import('./LendingContent'), {
  ssr: false,
  loading: () => (
    <div className="grid place-items-center pt-36 bg-transparent">
      <Spinner color="primary" size="lg" />
    </div>
  ),
})

export default function Page() {
  if (!showLending)
    redirect('/')

  return <DynamicInnerPage />
}
