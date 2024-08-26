import type { Server } from 'node:http'
import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { format } from 'node:url'
import cors from 'cors'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
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

export function createApp() {
  const app: express.Express = express()

  app.use(express.json())
  app.use(cors())

  return app
}

export async function startGraphqlServer(app: express.Express, path: string, { schemaPath, port, mocks, resolvers }: ServerOptions) {
  // Load schema from the file
  const schema = await loadSchema(schemaPath, {
    loaders: [new GraphQLFileLoader()],
  })

  const server = new ApolloServer({
    schema: addMocksToSchema({ schema, mocks, resolvers }),
  })

  // instance before passing the instance to `expressMiddleware`
  await server.start()

  app.use(path, expressMiddleware(server))

  const httpServer: Server = createServer(app)

  // Wait for server to start listening
  await new Promise<void>((resolve) => {
    httpServer.listen({ port }, resolve)
  })

  const url = urlForHttpServer(httpServer)

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

export function urlForHttpServer(httpServer: Server): string {
  const { address, port } = httpServer.address() as AddressInfo

  // Convert IPs which mean "any address" (IPv4 or IPv6) into localhost
  // corresponding loopback ip. Note that the url field we're setting is
  // primarily for consumption by our test suite. If this heuristic is wrong for
  // your use case, explicitly specify a frontend host (in the `host` option
  // when listening).
  const hostname = address === '' || address === '::' ? 'localhost' : address

  return format({
    protocol: 'http',
    hostname,
    port,
    pathname: '/',
  })
}
