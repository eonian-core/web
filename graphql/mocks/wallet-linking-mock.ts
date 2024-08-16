import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IResolvers } from '@graphql-tools/utils'

import { server } from './server'

function resolvers(): Partial<IResolvers> {
  return {
    Query: {
      getWalletPreview(address: string) {
        return {
          address,
          link: {
            __typename: 'EmailLinkPreview',
            email: 'alp***@g***.com',
          },
        }
      },
      getWallet(address: string) {
        return {
          address,
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
