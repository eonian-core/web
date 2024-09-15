import type { ApolloClient } from '@apollo/client'
import { getDeposits } from '../queries/get-deposit.query'

/**
 * (!) This is hacky and naive approach to calcaute total holders.
 * TODO: Consider to replace this logic later.
 */
export async function fetchHolders(client: ApolloClient<any>): Promise<string[]> {
  const holders = new Set<string>()
  try {
    const maxPages = 10
    const limit = 1000
    for (let i = 0; i < maxPages; i++) {
      const data = await getDeposits(client, limit * i, limit)
      const callers = data.deposits.map(deposit => deposit.caller)
      callers.forEach(caller => holders.add(caller))
      if (callers.length < limit)
        break
    }
    return Array.from(holders)
  }
  catch (e) {
    console.warn('Failed to fetch holders', '\nError:', e)
    return []
  }
}
