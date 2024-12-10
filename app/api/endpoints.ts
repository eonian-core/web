import { isOnServer } from '@/components/resize-hooks/isOnServer'
import { ChainId } from '@/providers/wallet/wrappers/helpers'
import { VERCEL_ENV, requireEnv } from '@/utils/env'

export enum ChainEnvironment {
  LOCAL = 'LOCAL',
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

const NEXT_PUBLIC_ENVIRONMENT = requireEnv('NEXT_PUBLIC_ENVIRONMENT', process.env.NEXT_PUBLIC_ENVIRONMENT) as ChainEnvironment
const isExist = Object.values<string>(ChainEnvironment).includes(NEXT_PUBLIC_ENVIRONMENT)
if (!isExist)
  throw new Error('Unknown chain environment')

export interface GraphQLEndpointsMap {
  [ChainId.BSC_MAINNET]: string
  [ChainId.SEPOLIA]: string
  [ChainId.UNKNOWN]: undefined
}

export const GraphQLEndpoints: GraphQLEndpointsMap = {
  [ChainId.BSC_MAINNET]: requireEnv('NEXT_PUBLIC_BSC_GRAPH_URL', process.env.NEXT_PUBLIC_BSC_GRAPH_URL),
  // Optional variable
  [ChainId.SEPOLIA]: requireEnv('NEXT_PUBLIC_SEPOLIA_GRAPH_URL', process.env.NEXT_PUBLIC_SEPOLIA_GRAPH_URL || 'http://localhost:4000/'),
  [ChainId.UNKNOWN]: undefined,
}

export function getVercelHostPrefix() {
  if (!isOnServer())
    return '' // will use relative path on client

  if (!VERCEL_ENV)
    return 'http://localhost:3000' // local

  if (VERCEL_ENV === 'production')
    return 'https://eonian.finance' // production

  return process.env.VERCEL_URL ?? '' // preview
}
