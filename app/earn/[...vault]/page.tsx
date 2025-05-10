import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import type { Vault } from '../../api'
import { getProtocolRscClient, getVaultBySymbol, getVaultsSymbols } from '../../api'
import { ChainId } from '../../providers/wallet/wrappers/helpers'
import { defaultChain } from '../../web3-onboard'
import { showEarn } from '../../features'
import { InterestRateSide, InterestRateType } from '../../api/protocol/gql/graphql'
import type { Scalars } from '../../api/protocol/gql/graphql'

import { TokenGradient } from './header/token-gradient'
import { PageContent } from './page-content'
import SkeletonPage from './skeleton-page'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import { convertToUsd } from '@/finances/usd'

export const revalidate = 10

interface RouteSegment {
  vault: [chainName: string, vaultSymbol: string] | [chainName: string]
}

interface Params {
  params: Partial<RouteSegment>
}

/**
 * Generates static page for each vault in every supported chain.
 * FIXME: For the alpha release, we can only use the default chain (BSC).
 */
export async function generateStaticParams(): Promise<RouteSegment[]> {
  const chainId = ChainId.parse(defaultChain.id)
  const client = getProtocolRscClient(chainId)
  const { data } = await getVaultsSymbols(client)
  return data.vaults.map(({ symbol }) => ({ vault: [ChainId.getName(chainId).toLowerCase(), symbol] }))
}

export default async function Page({ params }: Params) {
  const { vault: vaultRoute = [] } = params

  if (!showEarn)
    redirect('/')

  if (vaultRoute.length !== 2)
    redirect('/earn/')

  const [chainName, vaultSymbol] = vaultRoute
  const chainId = ChainId.getByName(chainName)
  const vault = await getVaultByChainAndSymbol(chainId, vaultSymbol)
  const symbol = getAssetSymbol(vault)

  const currentPrice = convertToUsd(vault.asset.price)

  return (
    <Suspense fallback={<SkeletonPage />}>
      <TokenGradient symbol={symbol} />
      <PageContent {...{ symbol, vault, chainId, currentPrice }} />
    </Suspense>
  )
}

async function getVaultByChainAndSymbol(chainId: ChainId, vaultSymbol: string) {
  // const client = getProtocolRscClient(chainId)
  // const { data } = await getVaultBySymbol(client, vaultSymbol)
  // const vault = data.vaults[0]
  // if (!vault)
  //   throw new Error(`Vault with symbol "${vaultSymbol}" not found`)

  // eslint-disable-next-line no-console
  console.log('getVaultByChainAndSymbol', chainId, vaultSymbol)
  const dummyId = '0x0000000000000000000000000000000000000000' as Scalars['Bytes']

  return Promise.resolve({
    address: '0x0000000000000000000000000000000000000000',
    asset: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'Dummy Asset',
      symbol: 'DUMMY',
      decimals: 18,
      price: {
        value: BigInt(0),
        decimals: 18,
        id: dummyId,
        __typename: 'Price',
      },
      id: dummyId,
      __typename: 'Token',
    },
    debtRatio: BigInt(0),
    decimals: 18,
    fundAssets: BigInt(0),
    fundAssetsUSD: BigInt(0),
    id: dummyId,
    lastReportTimestamp: BigInt(0),
    maxBps: BigInt(10000),
    name: 'Dummy Vault',
    rates: [
      {
        perBlock: BigInt(0),
        apy: {
          yearly: BigInt(0),
          monthly: BigInt(0),
          weekly: BigInt(0),
          daily: BigInt(0),
          decimals: 18,
          id: dummyId,
          __typename: 'RewardAPY',
        },
        side: InterestRateSide.Lender,
        type: InterestRateType.Variable,
        id: dummyId,
        __typename: 'InterestRate',
      },
    ],
    symbol: vaultSymbol,
    totalAssets: BigInt(0),
    totalDebt: BigInt(0),
    totalSupply: BigInt(0),
    totalUtilisationRate: BigInt(0),
    version: '1.0.0',
    __typename: 'Vault',
  } satisfies Vault)
}
