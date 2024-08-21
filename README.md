# Eonian WEB App

This is a repository for [the Eonian](https://eonian.finance) landing site and savings account application.

## Requirements

* NodeJS v18 or higher

## Development

### First Start Guide

Run development server

```bash
npm run dev
```

It will start

* NextJS application at [http://localhost:3000](http://localhost:3000) and the open page automatically

### Storybook

For the development of components and independent screens, there used Storybook.
To start it locally, use the following command:

```bash
npm run storybook
```

The Storybook will be available at [http://localhost:6006](http://localhost:6006) (or another port if it is busy).

### GraphQl API

For querying data from the blockchain and other services, there used GraphQL API.
The Graph page is available at [Graph Explorer](https://thegraph.com/explorer/subgraphs/AceUdeWNKAsCt5Vs5PWajJeUgL4aQT7w6jiGbBG95FHJ?view=Query&chain=arbitrum-one).

#### Mocking Server

The mocking server allows mocking this API for development purposes. To start it locally, use the following command:

```bash
yarn mock
```

#### Generate Introspection Types

To generate types for the GraphQL API, use the following command:

```bash
yarn gen:gql-types
```

### CDN

* <https://vercel.com/eonian/farm-app> - Web app project in Vercel
* <https://vercel.com/eonian/storybook> - Storybook project in Vercel


### Troubleshooting

#### Missing fonts
If you have problems with fonts in local development, i.e.: `FetchError: request to *.woff2 failed`, try to install recent LTS node version and run development server with TLS checks disabled:
- Run `nvm install --lts`
- Run `nvm use --lts`
- Delete `.next` folder
- Start development server with `npm run dev:no-tls`

Related github issue: https://github.com/vercel/next.js/issues/45080
