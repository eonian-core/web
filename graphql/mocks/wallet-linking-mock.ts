import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IResolvers } from '@graphql-tools/utils'

import { server } from './server'

interface QueryArgs {
  address: string
  chainId: number
}

enum MutationAction {
  LINK = 'LINK',
  UNLINK = 'UNLINK',
}

interface LinkEmailToWalletInput {
  action: MutationAction
  timestamp: string
  payload: LinkEmailToWalletInputPayload
  signature: string
}

interface LinkEmailToWalletInputPayload {
  chainId: number
  address: string
  link: EmailLinkInput
}

interface EmailLinkInput {
  email: string
}

const db: { [address_chainId: string]: { chainId: number; link: { email: string } } } = {}

function resolvers(): Partial<IResolvers> {
  return {
    Query: {
      getWalletPreview(source: any, { address, chainId }: QueryArgs, context: any, info: any) {
        const data = db[`${address}_${chainId}`]
        return {
          address,
          chainId,
          link: data
            ? {
                __typename: 'EmailLinkPreview',
                ...data.link,
              }
            : null,
        }
      },
      getWallet(source: any, { address, chainId }: QueryArgs, context: any, info: any) {
        const data = db[`${address}_${chainId}`]
        return {
          address,
          chainId,
          links: data
            ? [{
                payload: {
                  __typename: 'EmailLink',
                  ...data.link,
                },
              }]
            : [],
        }
      },
    },
    LinkPreview: { __resolveType },
    LinkPayload: { __resolveType },
    Mutation: {
      linkEmailToWallet(_, { input }: { input: LinkEmailToWalletInput }) {
        const { address, chainId, link } = input.payload
        const dbValue = { chainId, link }
        db[`${address}_${chainId}`] = dbValue

        return {
          address,
          chainId,
          links: [{
            payload: {
              __typename: 'EmailLink',
              ...link,
            },
          }],
        }
      },
    },
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
