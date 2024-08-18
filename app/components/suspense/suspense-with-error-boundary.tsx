'use client'

import { Suspense } from 'react'
import type { ErrorBoundaryPropsWithFallback } from 'react-error-boundary'
import { ErrorBoundary } from 'react-error-boundary'

export function SuspenseWithErrorBoundary({ fallback, ...props }: ErrorBoundaryPropsWithFallback) {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary fallback={fallback} {...props} />
    </Suspense>
  )
}
