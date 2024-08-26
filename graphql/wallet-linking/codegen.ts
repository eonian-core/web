import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://wallet-linker.fly.dev/graphql',
  documents: 'app/api/wallet-linking/**/*.{ts,tsx}',
  generates: {
    'graphql/wallet-linking/schema.graphql': {
      plugins: ['schema-ast'],
    },
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
