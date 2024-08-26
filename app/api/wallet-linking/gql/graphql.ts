/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: string;
};

export type EmailLink = {
  __typename?: 'EmailLink';
  createdAt: Scalars['DateTimeISO'];
  /** Initiator of the create action. Ex. user, admin */
  createdBy: Scalars['String'];
  /** soft delete, if set then deleted */
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  /** Initiator of the delete action. Ex. user, admin */
  deltedBy?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  walletId?: Maybe<Scalars['String']>;
};

export type EmailLinkListRelationFilter = {
  every?: InputMaybe<EmailLinkWhereInput>;
  none?: InputMaybe<EmailLinkWhereInput>;
  some?: InputMaybe<EmailLinkWhereInput>;
};

export type EmailLinkPreview = {
  __typename?: 'EmailLinkPreview';
  email: Scalars['String'];
  id: Scalars['String'];
  walletId?: Maybe<Scalars['String']>;
};

export type EmailLinkWhereInput = {
  AND?: InputMaybe<Array<EmailLinkWhereInput>>;
  NOT?: InputMaybe<Array<EmailLinkWhereInput>>;
  OR?: InputMaybe<Array<EmailLinkWhereInput>>;
  createdBy?: InputMaybe<StringFilter>;
  deltedBy?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringFilter>;
  wallet?: InputMaybe<WalletNullableRelationFilter>;
  walletId?: InputMaybe<StringNullableFilter>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  linkEmailToWallet: Wallet;
};


export type MutationLinkEmailToWalletArgs = {
  email: Scalars['String'];
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  wallet?: Maybe<Wallet>;
  walletPreview?: Maybe<WalletPreview>;
};


export type QueryWalletPreviewArgs = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type SocialLink = {
  __typename?: 'SocialLink';
  createdAt: Scalars['DateTimeISO'];
  /** Initiator of the create action. Ex. user, admin */
  createdBy: Scalars['String'];
  /** soft delete, if set then deleted */
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  /** Initiator of the delete action. Ex. user, admin */
  deltedBy?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** twitter, facebook, instagram, etc. */
  platform: Scalars['String'];
  username: Scalars['String'];
  walletId?: Maybe<Scalars['String']>;
};

export type SocialLinkListRelationFilter = {
  every?: InputMaybe<SocialLinkWhereInput>;
  none?: InputMaybe<SocialLinkWhereInput>;
  some?: InputMaybe<SocialLinkWhereInput>;
};

export type SocialLinkWhereInput = {
  AND?: InputMaybe<Array<SocialLinkWhereInput>>;
  NOT?: InputMaybe<Array<SocialLinkWhereInput>>;
  OR?: InputMaybe<Array<SocialLinkWhereInput>>;
  createdBy?: InputMaybe<StringFilter>;
  deltedBy?: InputMaybe<StringNullableFilter>;
  platform?: InputMaybe<StringFilter>;
  username?: InputMaybe<StringFilter>;
  wallet?: InputMaybe<WalletNullableRelationFilter>;
  walletId?: InputMaybe<StringNullableFilter>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isSet?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  _count?: Maybe<WalletCount>;
  /**
   * Wallet address
   * client and network can accidentially lowercase address
   * so store it in lowercase to prevent case mismatch
   */
  address: Scalars['String'];
  /** Chain id, ex. 1 for Ethereum, 56 for Binance Smart Chain */
  chainId: Scalars['Int'];
  createdAt: Scalars['DateTimeISO'];
  /** Initiator of the create action. Ex. user, admin */
  createdBy: Scalars['String'];
  /** soft delete, if set then deleted */
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  /** Initiator of the delete action. Ex. user, admin */
  deltedBy?: Maybe<Scalars['String']>;
  emailLinks: Array<EmailLink>;
  id: Scalars['String'];
  preview: WalletPreview;
  socialLinks: Array<SocialLink>;
};

export type WalletCount = {
  __typename?: 'WalletCount';
  emailLinks: Scalars['Int'];
  socialLinks: Scalars['Int'];
};


export type WalletCountEmailLinksArgs = {
  where?: InputMaybe<EmailLinkWhereInput>;
};


export type WalletCountSocialLinksArgs = {
  where?: InputMaybe<SocialLinkWhereInput>;
};

export type WalletNullableRelationFilter = {
  is?: InputMaybe<WalletWhereInput>;
  isNot?: InputMaybe<WalletWhereInput>;
};

export type WalletPreview = {
  __typename?: 'WalletPreview';
  /** Wallet address */
  address: Scalars['String'];
  /** Chain id, ex. 1 for Ethereum, 56 for Binance Smart Chain */
  chainId: Scalars['Int'];
  emailLink?: Maybe<EmailLinkPreview>;
  id: Scalars['String'];
};

export type WalletWhereInput = {
  AND?: InputMaybe<Array<WalletWhereInput>>;
  NOT?: InputMaybe<Array<WalletWhereInput>>;
  OR?: InputMaybe<Array<WalletWhereInput>>;
  address?: InputMaybe<StringFilter>;
  chainId?: InputMaybe<IntFilter>;
  createdBy?: InputMaybe<StringFilter>;
  deltedBy?: InputMaybe<StringNullableFilter>;
  emailLinks?: InputMaybe<EmailLinkListRelationFilter>;
  socialLinks?: InputMaybe<SocialLinkListRelationFilter>;
};

export type LinkEmailToWalletMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LinkEmailToWalletMutation = { __typename?: 'Mutation', linkEmailToWallet: { __typename?: 'Wallet', id: string, address: string, chainId: number, preview: { __typename?: 'WalletPreview', id: string, address: string, chainId: number, emailLink?: { __typename?: 'EmailLinkPreview', id: string, email: string } | null } } };

export type GetWalletPreviewQueryVariables = Exact<{
  address: Scalars['String'];
  chainId: Scalars['Int'];
}>;


export type GetWalletPreviewQuery = { __typename?: 'Query', walletPreview?: { __typename?: 'WalletPreview', id: string, address: string, chainId: number, emailLink?: { __typename?: 'EmailLinkPreview', id: string, email: string } | null } | null };

export type GetWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWalletQuery = { __typename?: 'Query', wallet?: { __typename?: 'Wallet', id: string, address: string, chainId: number, emailLinks: Array<{ __typename?: 'EmailLink', id: string, email: string }>, socialLinks: Array<{ __typename?: 'SocialLink', id: string, platform: string, username: string }> } | null };


export const LinkEmailToWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkEmailToWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkEmailToWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"emailLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LinkEmailToWalletMutation, LinkEmailToWalletMutationVariables>;
export const GetWalletPreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWalletPreview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletPreview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chainId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"emailLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetWalletPreviewQuery, GetWalletPreviewQueryVariables>;
export const GetWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"emailLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"socialLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetWalletQuery, GetWalletQueryVariables>;