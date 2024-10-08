/* eslint-disable no-console */
import LogRocket from 'logrocket'
import React, { useContext } from 'react'
import { clarityAdapter } from '@/analytics/clarity-adapter'

export interface MonitoringProperties {
  label: string
  address: string
}

interface MonitoringContextValue {
  identify: (uid: string, properties: MonitoringProperties) => void
  reportError: (error: Error, source: string) => void
}

export const MonitoringContext = React.createContext<MonitoringContextValue>({
  identify: () => {},
  reportError: () => {},
})

export function MonitoringProvider({ children }: React.PropsWithChildren) {
  React.useEffect(() => {
    const env = process.env.NODE_ENV
    if (env !== 'production') {
      console.debug(`Monitoring is disabled, ENV is not "production" (${env})`)
      return
    }

    const appId = process.env.NEXT_PUBLIC_LOGROCKET_APP_ID
    if (appId) {
      LogRocket.init(appId, {
        release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
      })

      const slug = appId.split('/').pop()?.toUpperCase() ?? '-'
      console.debug(`Monitoring is enabled (${slug})`)
      return
    }
    console.debug('Monitoring is disabled')
  }, [])

  const identify = React.useCallback((uid: string, properties: MonitoringProperties) => {
    if (process.env.NODE_ENV !== 'production')
      return

    clarityAdapter.trackTag('address', uid)
    clarityAdapter.trackTag('label', properties.label)
    LogRocket.identify(uid, properties as Record<string, any>)
    console.debug('User identification is set')
  }, [])

  const reportError = React.useCallback((error: Error, source: string) => {
    LogRocket.captureException(error, {
      tags: { source },
    })
  }, [])

  return <MonitoringContext.Provider value={{ identify, reportError }}>{children}</MonitoringContext.Provider>
}

export const useMonitoringContext = () => useContext(MonitoringContext)
