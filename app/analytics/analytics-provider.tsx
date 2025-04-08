import type { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'

import { Clarity } from './clarity'
import GoogleAnalytics from './google-analytics'
import { GoogleTagFooter, GoogleTagHead } from './google-tag'
import { MonitoringProvider } from './monitoring'
import type { CSPostHogProviderProps } from './posthog-provider'
import { CSPostHogProvider } from './posthog-provider'

const PostHogPageView = dynamic(() => import('./posthog-page-view-tracker'), {
  ssr: false,
})

export function InHeadAnalytics() {
  return (
    <>
      <Clarity />
      <GoogleTagHead />
    </>
  )
}

export function AfterHeadAnalytics() {
  return (
    <>
      <GoogleAnalytics />
    </>
  )
}

export function AroundBodyProviderAnalytics(props: CSPostHogProviderProps) {
  return <CSPostHogProvider {...props} />
}

export function InBodyProviderAnalytics({ children }: PropsWithChildren) {
  return (
    <>
      <GoogleTagFooter />
      <PostHogPageView />

      <MonitoringProvider>
        {children}
      </MonitoringProvider>
    </>
  )
}
