import { requireEnv } from '@/utils/env'

export class SuggestionsApi {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = requireEnv('NEXT_PUBLIC_SUGGESTIONS_ANON_KEY', process.env.NEXT_PUBLIC_SUGGESTIONS_ANON_KEY)
    this.baseUrl = requireEnv('NEXT_PUBLIC_SUGGESTIONS_API_URL', process.env.NEXT_PUBLIC_SUGGESTIONS_API_URL)
  }

  private getHeaders(): HeadersInit {
    return {
      'apikey': this.apiKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    }
  }

  async insertToken(id: string, token: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rest/v1/Tokens`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ id, token }),
    })

    if (!response.ok)
      throw new Error('Failed to insert token')
  }

  async updateTokenWithEmail(id: string, email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rest/v1/rpc/update_token_email_if_empty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
      },
      body: JSON.stringify({
        p_id: id,
        p_email: email,
      }),
    })

    if (!response.ok)
      throw new Error('Failed request')
  }

  async insertChain(id: string, token: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rest/v1/Chains`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ id, token }),
    })

    if (!response.ok)
      throw new Error('Failed to insert chain')
  }

  async updateChainWithEmail(id: string, email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rest/v1/rpc/update_chain_email_if_empty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
      },
      body: JSON.stringify({
        p_id: id,
        p_email: email,
      }),
    })

    if (!response.ok)
      throw new Error('Failed request')
  }
}
