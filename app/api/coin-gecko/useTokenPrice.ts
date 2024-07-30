import { TokenOrder, TokenSymbol } from "@/types"
import { usePromise } from "../use-promise"
import { isOnServer } from "@/components/resize-hooks/isOnServer"

const ONE_HOUR = 3600 // in seconds

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

export type PastYearPrices = Record<TokenSymbol, CoinGeckoGetResponse>

async function getTokenPrice(symbol: TokenSymbol): Promise<CoinGeckoGetResponse> {
    const response = await fetch(getPrefix() + `/api/coin-gecko?symbol=${symbol}`, {next: {
        revalidate: ONE_HOUR
    }})
    return await response.json()
}


export function useTokenPrice(symbol: TokenSymbol) {
    // TODO: switch in future from usePromise to tanstack query, it have much better caching, 
    //  but it harder to setup properly with latest version of NextJS
    return usePromise(async () => await getTokenPrice(symbol), [symbol])
}
