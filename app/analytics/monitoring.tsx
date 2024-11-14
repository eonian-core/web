'use client'
/* eslint-disable no-console */
import LogRocket from 'logrocket'
import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { analytics } from './analytics'

export interface MonitoringProperties {
  label: string
  address: string
}

interface MonitoringContextValue {
  identify: (uid: string, properties: MonitoringProperties) => void
  reportError: (error: Error, source: string) => void
}

export const MonitoringContext = createContext<MonitoringContextValue>({
  identify: () => {},
  reportError: () => {},
})

export function MonitoringProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
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

  const identify = useCallback((uid: string, properties: MonitoringProperties) => {
    if (process.env.NODE_ENV !== 'production')
      return

    analytics.identify(uid, properties as Record<string, any>)
  }, [])

  const reportError = useCallback((error: Error, source: string) => {
    LogRocket.captureException(error, {
      tags: { source },
    })
  }, [])

  return <MonitoringContext.Provider value={{ identify, reportError }}>{children}</MonitoringContext.Provider>
}

export const useMonitoringContext = () => useContext(MonitoringContext)
