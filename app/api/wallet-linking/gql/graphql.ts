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

/** Base meta information about the entity, support soft delete */
export type BaseEntity = {
  createdAt: Scalars['DateTimeISO'];
  /** Initiator of the create action. Ex. user, admin */
  createdBy: Scalars['String'];
  /** soft delete, if set then deleted */
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  /** Initiator of the delete action. Ex. user, admin */
  deletedBy?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type EmailLink = BaseEntity & {
  __typename?: 'EmailLink';
  createdAt: Scalars['DateTimeISO'];
  createdBy: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  deletedBy?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
};

export type EmailLinkInput = {
  email: Scalars['String'];
};

export type EmailLinkPreview = {
  __typename?: 'EmailLinkPreview';
  /** Masked preview of email, ex. j***@g***.com  */
  email: Scalars['String'];
  id: Scalars['String'];
};

export type Link = BaseEntity & {
  __typename?: 'Link';
  createdAt: Scalars['DateTimeISO'];
  createdBy: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  deletedBy?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  payload: LinkPayload;
  wallet: Wallet;
  walletId: Scalars['String'];
};

export type LinkEmailToWalletInput = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
  link: EmailLinkInput;
};

export type LinkPayload = EmailLink | SocialLink;

export type LinkPreview = EmailLinkPreview | SocialLinkPreview;

export type LinkSocialToWalletInput = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
  link: SocialLinkInput;
};

export type LinkSocialToWalletInputPayload = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
  link: SocialLinkInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Unlink wallet from email
   * Apply soft delete strategy for the link
   */
  deleteEmailLink: Link;
  /**
   * Unlink wallet from social
   * Apply soft delete strategy for the link
   */
  deleteSocialLink: Link;
  /**
   * Link wallet to email.
   * If wallet not exist then will create new wallet
   */
  linkEmailToWallet: Wallet;
  /**
   * Link wallet to social.
   * If wallet not exist then will create new wallet
   */
  linkSocialToWallet: Wallet;
};


export type MutationDeleteEmailLinkArgs = {
  input: LinkEmailToWalletInput;
};


export type MutationDeleteSocialLinkArgs = {
  input: LinkSocialToWalletInput;
};


export type MutationLinkEmailToWalletArgs = {
  input: LinkEmailToWalletInput;
};


export type MutationLinkSocialToWalletArgs = {
  input: LinkSocialToWalletInput;
};

export type Query = {
  __typename?: 'Query';
  getEmailLinks: Array<EmailLink>;
  getLinks: Array<Link>;
  getSocialLinks: Array<SocialLink>;
  /** Requires authentication header with wallet address signature */
  getWallet?: Maybe<Wallet>;
  /**
   * Only one route that not require authentication
   * Not inlcude deleted wallets and all data is masked
   */
  getWalletPreview?: Maybe<WalletPreview>;
  /** Requires admin authentication header */
  getWallets: Array<Wallet>;
};


export type QueryGetEmailLinksArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetLinksArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetSocialLinksArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetWalletArgs = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
};


export type QueryGetWalletPreviewArgs = {
  address: Scalars['String'];
  chainId: Scalars['Int'];
};


export type QueryGetWalletsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};

export type SocialLink = BaseEntity & {
  __typename?: 'SocialLink';
  createdAt: Scalars['DateTimeISO'];
  createdBy: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  deletedBy?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** twitter, facebook, instagram, etc. */
  platform: Scalars['String'];
  username: Scalars['String'];
};

export type SocialLinkInput = {
  platform: Scalars['String'];
  username: Scalars['String'];
};

export type SocialLinkPreview = {
  __typename?: 'SocialLinkPreview';
  id: Scalars['String'];
  platform: Scalars['String'];
  /** Masked preview of username, ex. @joh***  */
  username: Scalars['String'];
};

export type Wallet = BaseEntity & {
  __typename?: 'Wallet';
  address: Scalars['String'];
  /** Chain id, ex. 1 for Ethereum, 56 for Binance Smart Chain */
  chainId: Scalars['Int'];
  createdAt: Scalars['DateTimeISO'];
  createdBy: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTimeISO']>;
  deletedBy?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  links: Array<Link>;
  preview: WalletPreview;
};

export type WalletPreview = {
  __typename?: 'WalletPreview';
  address: Scalars['String'];
  chainId: Scalars['Int'];
  id: Scalars['String'];
  /**
   * If not empty, then the wallet is linked to an email or social account
   * Will return only last linked account
   */
  link?: Maybe<LinkPreview>;
};

export type LinkEmailToWalletMutationVariables = Exact<{
  input: LinkEmailToWalletInput;
}>;


export type LinkEmailToWalletMutation = { __typename?: 'Mutation', linkEmailToWallet: { __typename?: 'Wallet', id: string, address: string, chainId: number, links: Array<{ __typename?: 'Link', id: string, payload: { __typename?: 'EmailLink', id: string, email: string } | { __typename?: 'SocialLink', id: string, platform: string, username: string } }>, preview: { __typename?: 'WalletPreview', id: string, address: string, chainId: number, link?: { __typename?: 'EmailLinkPreview', id: string, email: string } | { __typename?: 'SocialLinkPreview', id: string, platform: string, username: string } | null } } };

export type GetWalletPreviewQueryVariables = Exact<{
  address: Scalars['String'];
  chainId: Scalars['Int'];
}>;


export type GetWalletPreviewQuery = { __typename?: 'Query', getWalletPreview?: { __typename?: 'WalletPreview', id: string, address: string, chainId: number, link?: { __typename?: 'EmailLinkPreview', id: string, email: string } | { __typename?: 'SocialLinkPreview', id: string, platform: string, username: string } | null } | null };

export type GetWalletQueryVariables = Exact<{
  address: Scalars['String'];
  chainId: Scalars['Int'];
}>;


export type GetWalletQuery = { __typename?: 'Query', getWallet?: { __typename?: 'Wallet', id: string, address: string, chainId: number, links: Array<{ __typename?: 'Link', id: string, payload: { __typename?: 'EmailLink', id: string, email: string } | { __typename?: 'SocialLink', id: string, platform: string, username: string } }> } | null };


export const LinkEmailToWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkEmailToWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LinkEmailToWalletInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkEmailToWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailLinkPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLinkPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LinkEmailToWalletMutation, LinkEmailToWalletMutationVariables>;
export const GetWalletPreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWalletPreview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWalletPreview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chainId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailLinkPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLinkPreview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWalletPreviewQuery, GetWalletPreviewQueryVariables>;
export const GetWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chainId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SocialLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWalletQuery, GetWalletQueryVariables>;