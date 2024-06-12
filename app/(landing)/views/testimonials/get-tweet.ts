/* eslint-disable unicorn/prefer-node-protocol */
import path from 'path'
import fs from 'fs/promises'

import { unstable_cache } from 'next/cache'
import type { Tweet } from 'react-tweet/api'
import { getTweet as _getTweet } from 'react-tweet/api'

let cacheFlushTimeout: NodeJS.Timeout | undefined
let fileCache: Partial<Record<string, Tweet>> | undefined

export const getTweet = unstable_cache(async (id: string) => {
  fileCache ??= await import('./tweets.json') as unknown as Partial<Record<string, Tweet>>

  let tweet = fileCache[id]
  if (tweet) {
    return tweet
  }

  tweet = await _getTweet(id)
  if (tweet) {
    fileCache[tweet.id_str] = tweet
  }

  if (process.env.NODE_ENV === 'development') {
    clearTimeout(cacheFlushTimeout)
    cacheFlushTimeout = setTimeout(flushCacheToFile, 1000)
  }

  return tweet
}, ['tweet'], { revalidate: 3600 * 24 })

function flushCacheToFile() {
  const cacheFile = path.join(__dirname, 'tweets.json')
  void fs.writeFile(cacheFile, JSON.stringify(fileCache, null, 2), 'utf-8')
  console.warn(`
    It seems like new tweets have been added to testimonials section.
    Tweets cache has been changed, saved to ${cacheFile}!
    Please, copy and replace the file from the /app directory.
  `)
}
