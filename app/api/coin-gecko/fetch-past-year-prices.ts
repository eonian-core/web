import { TokenOrder, TokenSymbol } from "@/types"
import { getPastYearPrice } from "./get-past-year-price"

export type PastYearPrices = Record<TokenSymbol, number>

/** Fetch prices for tokens */
export async function fetchPastYearPrices(): Promise<PastYearPrices> {
    console.log('fetchPastYearPrices')
    const results = Object.values(TokenOrder)
        .map(async symbol => ({symbol, price: await getPastYearPrice(symbol)}))
    
    const result = {} as PastYearPrices
    for (const {symbol, price} of await Promise.all(results))
        result[symbol] = price

    return result
}