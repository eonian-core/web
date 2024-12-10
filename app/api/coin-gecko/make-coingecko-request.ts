const ONE_HOUR = 3600

export async function makeCoinGeckoRequest<T>(url: string, revalidate = ONE_HOUR): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': getKey(),
    },
    next: {
      revalidate,
    },
  })

  if (!response.ok)
    throw new Error(`Failed to fetch ${url}, reason: ${response.statusText}`)

  return await response.json() as T
}

const KEYS = (process.env.COINGECKO_API_KEY || '').split(',').filter(Boolean)
let index = 0

/**
 * If multiple keys are provided, this function will cycle through them.
 */
function getKey(): string {
  index = (index + 1) % KEYS.length
  return KEYS[index]
}
