import { TokenSymbol } from "@/types"
import { usePromise } from "../use-promise"
import { isOnServer } from "@/components/resize-hooks/isOnServer"

export interface CoinGeckoGetResponse {
    pastYearPrice: number
}
// fallback for server components
const getPrefix = () => {
    if(!isOnServer()) {
        return '' // will use relative path on client
    }

    if(!process.env.VERCEL_ENV) {
        return 'http://localhost:3000' // local
    }

    if(process.env.VERCEL_ENV === 'production') {
        return 'https://eonian.finance' // production
    }

    return process.env.VERCEL_URL ?? '' // preview
}

async function getTokenPrice(symbol: TokenSymbol): Promise<CoinGeckoGetResponse> {
    const response = await fetch(getPrefix() + `/api/coin-gecko?symbol=${symbol}`)
    return await response.json()
}

export function useTokenPrice(symbol: TokenSymbol) {
    return usePromise(async () => await getTokenPrice(symbol), [symbol])
}