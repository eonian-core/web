/** Important to use process.env.[name] directly, because it replaced during build time */
export function requireEnv(name: string, value: string | undefined): string {
  if (!value)
    throw new Error(`Environment variable "${name}" not found`)

  logEnv(name, value)

  return value
}

/** Important to use process.env.[name] directly, because it replaced during build time */
export function logEnv(name: string, value: undefined | string): undefined | string {
  // eslint-disable-next-line no-console
  console.log(name, value)

  return value
}

export const VERCEL_ENV = logEnv('VERCEL_ENV', process.env.VERCEL_ENV)
export const isProduction = VERCEL_ENV === 'production'
