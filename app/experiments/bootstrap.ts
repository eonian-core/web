import { PostHog } from 'posthog-node'
import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { BootstrapConfig } from 'posthog-js'
import { generateUuid } from './uuid'
import { NEXT_PUBLIC_POSTHOG_HOST, NEXT_PUBLIC_POSTHOG_KEY } from '@/analytics/posthog-env'

const cookieName = `ph_${NEXT_PUBLIC_POSTHOG_KEY}_posthog`

// By some reason eslint fails to process types from next/headers properly
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-return: 0 */
export async function bootstrapExeperiments(): Promise<BootstrapConfig | undefined> {
  if (!NEXT_PUBLIC_POSTHOG_KEY || !NEXT_PUBLIC_POSTHOG_HOST)
    return undefined

  const cookieStore = cookies()
  const phCookie = cookieStore.get(cookieName) as RequestCookie

  const distinct_id = genIdIfNotExists(phCookie)

  const client = new PostHog(NEXT_PUBLIC_POSTHOG_KEY, {
    host: NEXT_PUBLIC_POSTHOG_HOST,
  })
  const flags = await client.getAllFlags(distinct_id)
  const bootstrap: BootstrapConfig = {
    distinctID: distinct_id,
    featureFlags: flags,
  }

  return bootstrap
}

function genIdIfNotExists(cookie?: RequestCookie) {
  try {
    if (!cookie)
      return generateUuid()

    const phCookieParsed = JSON.parse(cookie.value)
    const id = phCookieParsed?.distinct_id
    if (!id)
      return generateUuid()

    return id
  }
  catch (e) {
    console.error('Error parsing posthog cookie', e)
    return generateUuid()
  }
}
