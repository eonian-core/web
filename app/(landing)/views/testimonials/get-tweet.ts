import type { Tweet } from 'react-tweet/api'
import { getTweet as _getTweet } from 'react-tweet/api'
import { tweets } from './tweets'

const fileCache = tweets as unknown as Partial<Record<string, Tweet>>

export function getTweet(id: string) {
  return fileCache[id]
}
