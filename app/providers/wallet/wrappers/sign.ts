// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer'

// node:buffer cause build fail
import type { ethers } from 'ethers'
import type { DurationLike } from 'luxon'
import { DateTime } from 'luxon'
import type { DependencyList } from 'react'
import { useCallback, useState } from 'react'
import { SiweMessage } from 'siwe'

import type { ChainId } from './helpers'
import { fetchNonce } from '@/api/wallet-linking/nonce/fetch-nonce'

export function useSignMessage(provider: ethers.BrowserProvider | null) {
  return useCallback(async (chainId: ChainId, statement: string, nonce?: string) => {
    return await signMessage(provider, chainId, statement, nonce)
  }, [provider])
}

const SIGN_EXPIRATION_INTERVAL: DurationLike = { minutes: 10 }

export interface SignedMessage {
  message: SiweMessage
  signature: string
}

/** Returns signature token that can be used in x-signature header */
export async function signMessage(provider: ethers.BrowserProvider | null, chainId: ChainId, statement: string, nonce?: string): Promise<SignedMessage | null> {
  const signer = await provider?.getSigner()
  if (!signer)
    return null

  const domain = window.location.host
  const origin = window.location.origin

  const message = new SiweMessage({
    domain,
    nonce,
    address: signer.address,
    statement,
    uri: origin,
    version: '1',
    chainId,
    expirationTime: DateTime.now().plus(SIGN_EXPIRATION_INTERVAL).toISO(),
  })

  const signature = await signer.signMessage(message.prepareMessage())
  return { message, signature }
}

const SIGN_STATMENT = 'Sign in with wallet to Eonian'

export function useLoginThroughSign(provider: ethers.BrowserProvider | null, chainId?: ChainId) {
  return useProcessing(async (): Promise<string> => {
    if (!provider || !chainId)
      throw new Error('Sign login failed: wallet not connected')

    const { nonce } = await fetchNonce()
    const signed = await signMessage(provider, chainId, SIGN_STATMENT, nonce)
    if (!signed)
      throw new Error('Sign login failed: cannot sign message')

    const { message, signature } = signed
    return `${Buffer.from(JSON.stringify(message)).toString('base64')}.${signature}`
  }, [provider, chainId])
}

export function useProcessing<T extends Array<any> = [], R = any>(callback: (...args: T) => Promise<R>, deps: DependencyList): [(...args: T) => Promise<R>, boolean] {
  const [processing, setIsProcessing] = useState(false)

  const wrappedCallback = useCallback(async (...args: T) => {
    setIsProcessing(true)
    try {
      const result = await callback(...args)
      setIsProcessing(false)

      return result
    }
    catch (error) {
      console.error('Error during processing', error)
      setIsProcessing(false)
      throw error
    }
  }, deps)

  return [wrappedCallback, processing]
}
