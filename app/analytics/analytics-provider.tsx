import type { PropsWithChildren } from 'react'
import { Clarity } from './clarity'
import GoogleAnalytics from './google-analytics'
import { GoogleTagFooter, GoogleTagHead } from './google-tag'
import { MonitoringProvider } from './monitoring'

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

export function InBodyProviderAnalytics({ children }: PropsWithChildren) {
  return (
        <>
            <GoogleTagFooter />

            <MonitoringProvider>
                {children}
            </MonitoringProvider>
        </>
  )
}
