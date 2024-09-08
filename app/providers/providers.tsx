'use client'

import React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
import ThemesProvider from './themes'
import { WalletWrapperProvider } from './wallet/wallet-wrapper-provider'
import { AuthProvider } from './auth'
import { MonitoringProvider } from './monitoring'
import { ChainProvider } from '@/shared/web3/chain-context'
import { ApolloSsrProvider } from '@/api/apollo-ssr-provider'
import { WalletLinkingProvider } from '@/views/wallet-linking-drawer/wallet-linking-drawer'
import { NotifyTokenProvider } from '@/views/notify-token-drawer/notify-token-drawer'

interface Props {
  locale: string
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <MonitoringProvider>
      <ThemesProvider>
        <ReduxProvider store={store}>
          <WalletWrapperProvider>
            <AuthProvider>
              <ChainProvider>
                <ApolloSsrProvider>
                  <WalletLinkingProvider>
                    <NotifyTokenProvider>{children}</NotifyTokenProvider>
                  </WalletLinkingProvider>
                </ApolloSsrProvider>
              </ChainProvider>
            </AuthProvider>
          </WalletWrapperProvider>
        </ReduxProvider>
      </ThemesProvider>
    </MonitoringProvider>
  )
}
