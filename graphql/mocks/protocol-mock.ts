import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolvers as scalarResolvers, mocks as scalarsMocks } from 'graphql-scalars'

import vaults from './data/vaults.json' assert { type: 'json' }
import { server } from './server'

const mocks = {
  BigInt: scalarsMocks.BigInt,
  Bytes: scalarsMocks.UUID,
}

function resolvers() {
  return {
    Query: {
      vaults() {
        return vaults
      },
    },
    BigInt: scalarResolvers.BigInt,
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

void server({
  schemaPath: join(__dirname, '../protocol/schema.graphql'),
  port: 4004,
  mocks,
  resolvers,
})
