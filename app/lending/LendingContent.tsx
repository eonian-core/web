'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LendingStateProvider } from './LendingState'
import { LendingPage } from './components/LendingPage'

import './styles.overrides.scss'

const queryClient = new QueryClient()

export default function LendingContent() {
  return (
    <div className="lending-styles bg-gradient-to-br from-default-950 via-default-900 to-default-950 text-foreground-50">
      <QueryClientProvider client={queryClient}>
        <LendingStateProvider>
          <LendingPage />
        </LendingStateProvider>
      </QueryClientProvider>
    </div>
  )
}
