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
    "\n    mutation LinkEmailToWallet($email: String!) {\n        linkEmailToWallet(email: $email) {\n            id\n            address\n            chainId\n            preview {\n                id\n                address\n                chainId\n                emailLink {\n                    id\n                    email\n                }\n            }\n        }\n    }\n": types.LinkEmailToWalletDocument,
    "\n  query GetWalletPreview($address: String!, $chainId: Int!) {\n    walletPreview(address: $address, chainId: $chainId) {\n      id\n      address\n      chainId\n      emailLink {\n        id\n        email\n      }\n    }\n  }\n": types.GetWalletPreviewDocument,
    "\n  query GetWallet {\n    wallet {\n      id\n      address\n      chainId\n      emailLinks {\n        id\n        email\n      }\n      socialLinks {\n        id\n        platform\n        username\n      }\n    }\n  }\n": types.GetWalletDocument,
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
export function graphql(source: "\n    mutation LinkEmailToWallet($email: String!) {\n        linkEmailToWallet(email: $email) {\n            id\n            address\n            chainId\n            preview {\n                id\n                address\n                chainId\n                emailLink {\n                    id\n                    email\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation LinkEmailToWallet($email: String!) {\n        linkEmailToWallet(email: $email) {\n            id\n            address\n            chainId\n            preview {\n                id\n                address\n                chainId\n                emailLink {\n                    id\n                    email\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWalletPreview($address: String!, $chainId: Int!) {\n    walletPreview(address: $address, chainId: $chainId) {\n      id\n      address\n      chainId\n      emailLink {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWalletPreview($address: String!, $chainId: Int!) {\n    walletPreview(address: $address, chainId: $chainId) {\n      id\n      address\n      chainId\n      emailLink {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWallet {\n    wallet {\n      id\n      address\n      chainId\n      emailLinks {\n        id\n        email\n      }\n      socialLinks {\n        id\n        platform\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWallet {\n    wallet {\n      id\n      address\n      chainId\n      emailLinks {\n        id\n        email\n      }\n      socialLinks {\n        id\n        platform\n        username\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;