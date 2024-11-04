import { logEnv } from '@/utils/env'

export const NEXT_PUBLIC_POSTHOG_KEY = logEnv('NEXT_PUBLIC_POSTHOG_KEY', process.env.NEXT_PUBLIC_POSTHOG_KEY)
export const NEXT_PUBLIC_POSTHOG_HOST = logEnv('NEXT_PUBLIC_POSTHOG_HOST', process.env.NEXT_PUBLIC_POSTHOG_HOST)
