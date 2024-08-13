import { useEffect, useState } from 'react'
import type { TokenSymbol } from '@/types'

export interface PlaceholderPair {
  value: number
  delay: number
}

const coinRange = [0, 1, 2, 3, 4, 5, 9, 10, 15, 20, 25, 30, 35, 39, 40, 41, 42] // length: 17
const delays = [1000, 300, 200, 100, ...(Array.from({ length: 9 }).fill(50)), 100, 200, 300, 500] // length: 17
const mapOfCoinPlaceholders: Array<PlaceholderPair> = coinRange.map((value, index) => ({ value, delay: delays[index] as number }))

const stableRange = [0, 1, 2, 3, 10, 15, 20, 35, 50, 100, 155, 200, 296, 297, 298, 299, 300] // length: 17
const mapOfStablePlaceholders: Array<PlaceholderPair> = stableRange.map((value, index) => ({ value, delay: delays[index] as number }))

export const coinsPlaceholders: { [key in TokenSymbol]: Array<PlaceholderPair> } = {
  USDC: mapOfStablePlaceholders,
  USDT: mapOfStablePlaceholders,
  DAI: mapOfStablePlaceholders,
  BTCB: mapOfCoinPlaceholders,
  ETH: mapOfCoinPlaceholders,
  BNB: mapOfCoinPlaceholders,
}

const timeout = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

export function usePlaceholderAnimation(mapOfPlaceholders: Array<PlaceholderPair>, onPlaceholderChange: (value: string | bigint) => void) {
  const [haveRun, setHaveRun] = useState(false)

  useEffect(() => {
    let exit = false

    const animate = async () => {
      if (haveRun)
        return

      for (const { value, delay } of mapOfPlaceholders) {
        if (exit)
          return

        await timeout(delay)
        onPlaceholderChange(`${value}`)
      }

      setHaveRun(true)
    }

    void animate()
      .catch(console.error)

    return () => {
      exit = true
    }
  }, [onPlaceholderChange, haveRun, setHaveRun, mapOfPlaceholders])
}
