/** Important to use process.env.[name] directly, because it replaced during build time */
export function requireEnv(name: string, value: string | undefined): string {
  if (!value)
    throw new Error(`Environment variable "${name}" not found`)

  logEnv(name, value)

  return value
}

export function addHttpIfNeed(url: string): string {
  if (url.startsWith('http'))
    return url

  return `https://${url}`
}

/** Important to use process.env.[name] directly, because it replaced during build time */
export function logEnv<T = undefined | string>(name: string, value: T): T {
  // eslint-disable-next-line no-console
  console.log(name, value)

  return value
}

export const VERCEL_ENV = logEnv('VERCEL_ENV', process.env.VERCEL_ENV)
export const isProduction = VERCEL_ENV === 'production'
