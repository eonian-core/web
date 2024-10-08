/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetDeposits($offset: Int!, $limit: Int!) {\n    deposits(first: $limit, skip: $offset, orderBy: blockTimestamp, orderDirection: desc) {\n      caller\n    }\n  }\n": types.GetDepositsDocument,
    "\n  query VaultBySymbol($symbol: String!) {\n    vaults(where: { symbol: $symbol }) {\n      asset {\n        address\n        name\n        symbol\n        decimals\n        price {\n          value\n          decimals\n        }\n      }\n      rates(first: 1, where: { side: LENDER }) {\n        perBlock\n        apy {\n          yearly\n        }\n      }\n      address\n      name\n      symbol\n      decimals\n      fundAssets\n      fundAssetsUSD\n    }\n  }\n": types.VaultBySymbolDocument,
    "\n  query GetVaults {\n    vaults(orderBy: name, orderDirection: asc) {\n      asset {\n        address\n        name\n        symbol\n        decimals\n        price {\n          value\n          decimals\n        }\n      }\n      rates(first: 1, where: { side: LENDER }) {\n        perBlock\n        apy {\n          yearly\n        }\n      }\n      address\n      name\n      symbol\n      decimals\n      fundAssets\n      fundAssetsUSD\n    }\n  }\n": types.GetVaultsDocument,
    "\n  query GetVaultsSymbols {\n    vaults(orderBy: name, orderDirection: asc) {\n      symbol\n    }\n  }\n": types.GetVaultsSymbolsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDeposits($offset: Int!, $limit: Int!) {\n    deposits(first: $limit, skip: $offset, orderBy: blockTimestamp, orderDirection: desc) {\n      caller\n    }\n  }\n"): (typeof documents)["\n  query GetDeposits($offset: Int!, $limit: Int!) {\n    deposits(first: $limit, skip: $offset, orderBy: blockTimestamp, orderDirection: desc) {\n      caller\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VaultBySymbol($symbol: String!) {\n    vaults(where: { symbol: $symbol }) {\n      asset {\n        address\n        name\n        symbol\n        decimals\n        price {\n          value\n          decimals\n        }\n      }\n      rates(first: 1, where: { side: LENDER }) {\n        perBlock\n        apy {\n          yearly\n        }\n      }\n      address\n      name\n      symbol\n      decimals\n      fundAssets\n      fundAssetsUSD\n    }\n  }\n"): (typeof documents)["\n  query VaultBySymbol($symbol: String!) {\n    vaults(where: { symbol: $symbol }) {\n      asset {\n        address\n        name\n        symbol\n        decimals\n        price {\n          value\n          decimals\n        }\n      }\n      rates(first: 1, where: { side: LENDER }) {\n        perBlock\n        apy {\n          yearly\n        }\n      }\n      address\n      name\n      symbol\n      decimals\n      fundAssets\n      fundAssetsUSD\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVaults {\n    vaults(orderBy: name, orderDirection: asc) {\n      asset {\n        address\n        name\n        symbol\n        decimals\n        price {\n          value\n          decimals\n        }\n      }\n      rates(first: 1, where: { side: LENDER }) {\n        perBlock\n        apy {\n          yearly\n        }\n      }\n      address\n      name\n      symbol\n      decimals\n      fundAssets\n      fundAssetsUSD\n    }\n  }\n"): (typeof documents)["\n  query GetVaults {\n    vaults(orderBy: name, orderDirection: asc) {\n      asset {\n        address\n        name\n        symbol\n        decimals\n        price {\n          value\n          decimals\n        }\n      }\n      rates(first: 1, where: { side: LENDER }) {\n        perBlock\n        apy {\n          yearly\n        }\n      }\n      address\n      name\n      symbol\n      decimals\n      fundAssets\n      fundAssetsUSD\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVaultsSymbols {\n    vaults(orderBy: name, orderDirection: asc) {\n      symbol\n    }\n  }\n"): (typeof documents)["\n  query GetVaultsSymbols {\n    vaults(orderBy: name, orderDirection: asc) {\n      symbol\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;