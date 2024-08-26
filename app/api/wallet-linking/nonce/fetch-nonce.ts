import { walletLinkingEndpoint } from '@/api/apollo.endpoints'

export interface NonceResponse {
  nonce: string
}

export async function fetchNonce(): Promise<NonceResponse> {
  const url = new URL('/nonce', walletLinkingEndpoint)
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok)
    throw new Error('Failed to fetch nonce')

  return await response.json() as NonceResponse
}
