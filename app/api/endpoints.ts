import { isOnServer } from '@/components/resize-hooks/isOnServer'
import { VERCEL_ENV } from '@/utils/env'

export function getVercelHostPrefix() {
  if (!isOnServer())
    return '' // Return empty prefix on client to use relative URLs

  if (!VERCEL_ENV)
    return 'http://localhost:3000'

  if (VERCEL_ENV === 'production')
    return withScheme(process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_APP_URL || 'eonian.finance')

  return withScheme(process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL || 'eonian.finance')
}

function withScheme(host: string): string {
  return host.startsWith('http') ? host : `https://${host}`
}
