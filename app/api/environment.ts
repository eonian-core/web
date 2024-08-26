/** Important to use process.env.[name] directly, because it replaced during build time */
export function requireEnv(name: string, value: string | undefined): string {
  if (!value)
    throw new Error(`Environment variable "${name}" not found`)

  // eslint-disable-next-line no-console
  console.log(name, value)

  return value
}
