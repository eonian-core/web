import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import type { IMockStore, IMocks } from '@graphql-tools/mock'
import { addMocksToSchema } from '@graphql-tools/mock'
import { loadSchema } from '@graphql-tools/load'
import type { IResolvers } from '@graphql-tools/utils'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

export interface ServerOptions {
  schemaPath: string
  port: number
  mocks: IMocks<IResolvers>
  resolvers: (store: IMockStore) => Partial<IResolvers>
}

export async function server({ schemaPath, port, mocks, resolvers }: ServerOptions) {
  // Load schema from the file
  const schema = await loadSchema(schemaPath, {
    loaders: [new GraphQLFileLoader()],
  })

  const server = new ApolloServer({
    schema: addMocksToSchema({ schema, mocks, resolvers }),
  })

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  })

  // eslint-disable-next-line no-console
  console.log(`
╭───────────────────────────────────────────────────╮
│                                                   │
│           🚀 Mocking server started!              │
│                                                   │
│    Local:            ${url}       │
│                                                   │
╰───────────────────────────────────────────────────╯
    `)
}
