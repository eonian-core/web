'use client'

import React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
import ThemesProvider from './themes'
import { WalletWrapperProvider } from './wallet/wallet-wrapper-provider'
import { AuthProvider } from './auth'
import { MonitoringProvider } from './monitoring'
import { PlasmicClientRootProvider } from './plasmic-init-client'
import { ChainProvider } from '@/shared/web3/chain-context'
import { ApolloSsrProvider } from '@/api/apollo-ssr-provider'
import { WalletLinkingProvider } from '@/views/wallet-linking-drawer/wallet-linking-drawer'

interface Props {
  locale: string
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <PlasmicClientRootProvider>
      <MonitoringProvider>
        <ThemesProvider>
          <ReduxProvider store={store}>
            <WalletWrapperProvider>
              <AuthProvider>
                <ChainProvider>
                  <ApolloSsrProvider>
                    <WalletLinkingProvider>{children}</WalletLinkingProvider>
                  </ApolloSsrProvider>
                </ChainProvider>
              </AuthProvider>
            </WalletWrapperProvider>
          </ReduxProvider>
        </ThemesProvider>
      </MonitoringProvider>
    </PlasmicClientRootProvider>
  )
}
