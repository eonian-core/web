import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ZeroAddress } from 'ethers'
import type { FormTab } from './components/form/types'
import type { CommonLendingStatistics, Market, UserLendingStatistics } from './web3/types'
import { fetchUserPositions } from './web3/fetch-user-positions'
import { fetchMarkets } from './web3/fetch-markets'
import { enrichMarkets } from './web3/enrich-markets'
import { calculateCommonStatistics, calculateUserStatistics } from './web3/calculate-statistics'
import { useFormAction } from './hooks/useFormAction'
import type { NumberInputValue } from './hooks/useNumberInputValue'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { ChainId } from '@/providers/wallet/wrappers/helpers'

export interface FormData {
  tab: FormTab
  market: Market
}

interface LendingStateContextType {
  markets: Market[]
  loading: boolean
  fetching: boolean
  error: Error | null
  refresh: () => Promise<void>

  chainId: ChainId
  chainName: string

  commonStatistics: CommonLendingStatistics
  userStatistics: UserLendingStatistics

  formData: FormData | null
  setFormData: (data: FormData | null) => void

  isActionPending: boolean
  doFormAction: (inputData: NumberInputValue) => Promise<boolean>
}

const LendingStateContext = createContext<LendingStateContextType | undefined>(undefined)

export function useLendingState() {
  const context = useContext(LendingStateContext)
  if (!context)
    throw new Error('useLendingState must be used within a LendingStateProvider')

  return context
}

interface LendingStateProviderProps {
  children: ReactNode
}

export function LendingStateProvider({ children }: LendingStateProviderProps) {
  const { wallet, chains } = useWalletWrapperContext()

  const chainId = ChainId.ZEN_CHAIN_TESTNET
  const chainName = chains.find(chain => chain.id === chainId)?.name

  const markets = useMarkets(chainId, wallet?.address)
  const [formData, setFormData] = useState<FormData | null>(null)

  const { doFormAction, isActionPending } = useFormAction(formData, markets.fetch)

  const formDataWithPosition = useMemo(() => {
    if (!formData)
      return null

    return {
      ...formData,
      market: markets.data.find(market => market.address === formData.market.address)!,
    }
  }, [formData, markets.data])

  const commonStatistics = useMemo(() => calculateCommonStatistics(markets.data), [markets.data])
  const userStatistics = useMemo(() => calculateUserStatistics(markets.data), [markets.data])

  const value: LendingStateContextType = {
    markets: markets.data,
    loading: markets.loading,
    fetching: markets.fetching,
    error: markets.error,
    refresh: markets.fetch,

    chainId,
    chainName: chainName ?? 'Unknown chain',

    commonStatistics,
    userStatistics,

    formData: formDataWithPosition,
    setFormData,

    isActionPending,
    doFormAction,
  }

  return <LendingStateContext.Provider value={value}>{children}</LendingStateContext.Provider>
}

function useMarkets(chainId: ChainId, walletAddress: string | undefined) {
  const rawMarkets = useQuery({
    queryKey: ['markets', chainId],
    queryFn: () => fetchMarkets(chainId),
    staleTime: 10 * 1000,
    retry: false,
  })

  const rawUserPositions = useQuery({
    queryKey: ['userPositions', String(chainId), walletAddress ?? ZeroAddress],
    enabled: !!walletAddress && !!rawMarkets?.data?.length,
    queryFn: () => fetchUserPositions(chainId, walletAddress!, rawMarkets?.data ?? []),
    staleTime: 10 * 1000,
    retry: false,
  })

  const markets = useMemo(
    () => enrichMarkets(chainId, rawMarkets.data ?? [], rawUserPositions.data ?? []),
    [chainId, rawMarkets, rawUserPositions],
  )

  return {
    data: markets,
    loading: rawMarkets.isLoading || rawUserPositions.isLoading,
    fetching: rawMarkets.isFetching || rawUserPositions.isFetching,
    error: rawMarkets.error || rawUserPositions.error,
    fetch: useCallback(async () => {
      await rawMarkets.refetch()
      await rawUserPositions.refetch()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  }
}
