import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IResolvers } from '@graphql-tools/utils'

import { server } from './server'

interface QueryArgs {
  address: string
  chainId: number
}

function resolvers(): Partial<IResolvers> {
  return {
    Query: {
      getWalletPreview(source: any, { address, chainId }: QueryArgs, context: any, info: any) {
        return {
          address,
          chainId,
          link: {
            __typename: 'EmailLinkPreview',
            email: 'alp***@g***.com',
          },
        }
      },
      getWallet(source: any, { address, chainId }: QueryArgs, context: any, info: any) {
        return {
          address,
          chainId,
          links: [{
            payload: {
              __typename: 'EmailLink',
              email: 'alpha@gmail.com',
            },
          }],
        }
      },
    },
    LinkPreview: { __resolveType },
    LinkPayload: { __resolveType },
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

void server({
  schemaPath: join(__dirname, '../wallet-linking/schema.graphql'),
  port: 5000,
  mocks: {},
  resolvers,
})

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function __resolveType(obj: any, context: any, info: any): any {
  return obj.__typename
}
