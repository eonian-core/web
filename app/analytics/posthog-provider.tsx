// app/providers.js
'use client'

import type { BootstrapConfig } from 'posthog-js'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import { type PropsWithChildren } from 'react'
import { NEXT_PUBLIC_POSTHOG_HOST, NEXT_PUBLIC_POSTHOG_KEY } from './posthog-env'

declare global {
  interface Window {
    posthog: typeof posthog | undefined
  }
}

export interface CSPostHogProviderProps extends PropsWithChildren {
  bootstrap?: BootstrapConfig
}

export function CSPostHogProvider({ children, bootstrap }: CSPostHogProviderProps) {
  if (typeof window !== 'undefined' && NEXT_PUBLIC_POSTHOG_KEY && NEXT_PUBLIC_POSTHOG_HOST) {
    posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'always', // or 'identified_only' to ignore anonymous users
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true,
      bootstrap,
    })

    window.posthog = posthog
  }

  return (
    <PostHogProvider client={posthog}>
      {children}
    </PostHogProvider>
  )
}
