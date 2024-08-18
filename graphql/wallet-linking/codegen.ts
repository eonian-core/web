import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/wallet-linking/schema.graphql',
  documents: 'app/api/wallet-linking/**/*.{ts,tsx}',
  generates: {
    'app/api/wallet-linking/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        strictScalars: true,
        scalars: {
          DateTimeISO: 'string',
        },
      },
    },
  },
}

export default config
