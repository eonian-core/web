'use client'

import React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
import ThemesProvider from './themes'
import { WalletWrapperProvider } from './wallet/wallet-wrapper-provider'
import { AuthProvider } from './auth'
import { WaitlistProvider } from './waitlist'
import { MonitoringProvider } from './monitoring'
import { ChainProvider } from '@/shared/web3/chain-context'
import { ApolloSsrProvider } from '@/api/apollo-ssr-provider'

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
            <WaitlistProvider>
              <AuthProvider>
                <ChainProvider>
                  <ApolloSsrProvider>
                    {children}
                  </ApolloSsrProvider>
                </ChainProvider>
              </AuthProvider>
            </WaitlistProvider>
          </WalletWrapperProvider>
        </ReduxProvider>
      </ThemesProvider>
    </MonitoringProvider>
  )
}
