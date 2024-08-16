import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.studio.thegraph.com/query/48141/eonian-bsc-development/version/latest',
  documents: 'app/api/protocol/queries/*.{ts,tsx}',
  generates: {
    'graphql/protocol/schema.graphql': {
      plugins: ['schema-ast'],
    },
    'app/api/protocol/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        strictScalars: true,
        scalars: {
          BigInt: 'bigint',
          Bytes: 'string',
          Int8: 'number',
          BigDecimal: 'string',
          Timestamp: 'string',
        },
      },
      plugins: [
        {
          '@eonian/graphql-typescript-scalar-type-policies': {
            scalarTypePolicies: {
              // File path should be relative to the generated "graphql.ts"
              BigInt: '../policies/bigIntPolicy#bigIntPolicy',
            },
          },
        },
      ],
    },
  },
}

export default config
