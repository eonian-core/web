import { ChainId } from '../providers/wallet/wrappers/helpers'

export enum ChainEnvironment {
  LOCAL = 'LOCAL',
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export type DecoratedFunction<T, R> = (...args: T[]) => R

export function logDecorator<T, R>(func: DecoratedFunction<T, R>): DecoratedFunction<T, R> {
  return (...args: T[]): R => {
    const result = func(...args)
    // eslint-disable-next-line no-console
    console.debug(
      `Resolve ${func.name}:`,
      args.length === 1 ? args[0] : args,
      '->',
      result,
    )
    return result
  }
}

export function chainEnvironment(): ChainEnvironment {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
  if (!environment)
    return ChainEnvironment.DEVELOPMENT

  const isExist = Object.values<string>(ChainEnvironment).includes(environment)
  if (!isExist)
    throw new Error('Unknown chain environment')

  return ChainEnvironment[environment as keyof typeof ChainEnvironment]
}

export const getChainEnvironment = logDecorator(chainEnvironment)

function bnbChainEndpoint(chainEnvironment: ChainEnvironment): string {
  switch (chainEnvironment) {
    case ChainEnvironment.LOCAL:
      return 'http://localhost:4000/'
    case ChainEnvironment.DEVELOPMENT:
      // By default fallback to the development subgraph URL
      // More info https://thegraph.com/studio/subgraph/eonian-bsc-development/
      return process.env.NEXT_PUBLIC_BSC_DEVELOPMENT_GRAPH_URL || 'https://api.studio.thegraph.com/query/48141/eonian-bsc-development/version/latest'
    case ChainEnvironment.STAGING:
      // By default fallback to the development subgraph URL
      // More info https://thegraph.com/studio/subgraph/eonian-bsc-staging/
      return process.env.NEXT_PUBLIC_BSC_STAGING_GRAPH_URL || 'https://api.studio.thegraph.com/query/48141/eonian-bsc-staging/version/latest'
    default:
      return process.env.NEXT_PUBLIC_GRAPH_URL || 'http://localhost:4000/'
  }
}

export const getBNBChainEndpoint = logDecorator(bnbChainEndpoint)

function graphQLEndpoint(chainId: ChainId): string {
  const chainEnvironment = getChainEnvironment()
  switch (chainId) {
    case ChainId.BSC_MAINNET:
      return getBNBChainEndpoint(chainEnvironment)
    case ChainId.SEPOLIA:
      return process.env.NEXT_PUBLIC_GRAPH_URL || 'http://localhost:4000/'
    case ChainId.UNKNOWN:
      throw new Error('Chain is unknown')
  }
}

export const getGraphQLEndpoint = logDecorator(graphQLEndpoint)
