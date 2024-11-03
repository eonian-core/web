// app/providers.js
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import type { PropsWithChildren } from 'react'
import { logEnv } from '@/utils/env'

const NEXT_PUBLIC_POSTHOG_KEY = logEnv('NEXT_PUBLIC_POSTHOG_KEY', process.env.NEXT_PUBLIC_POSTHOG_KEY)
const NEXT_PUBLIC_POSTHOG_HOST = logEnv('NEXT_PUBLIC_POSTHOG_HOST', process.env.NEXT_PUBLIC_POSTHOG_HOST)

if (typeof window !== 'undefined' && NEXT_PUBLIC_POSTHOG_KEY && NEXT_PUBLIC_POSTHOG_HOST) {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always', // or 'identified_only' to ignore anonymous users
  })
}
export function CSPostHogProvider({ children }: PropsWithChildren) {
  return (
      <PostHogProvider client={posthog}>
        {children}
      </PostHogProvider>
  )
}
