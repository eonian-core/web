'use client'

import React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
import ThemesProvider from './themes'
import { WalletWrapperProvider } from './wallet/wallet-wrapper-provider'
import { AuthProvider } from './auth'
import { ChainProvider } from '@/shared/web3/chain-context'
import { WalletLinkingProvider } from '@/views/wallet-linking-drawer/wallet-linking-drawer'
import { SuggestTokenProvider } from '@/views/suggest-token-drawer/suggest-token-drawer'
import { SuggestChainProvider } from '@/views/suggest-chain-drawer/suggest-chain-drawer'

interface Props {
  locale: string
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ThemesProvider>
      <ReduxProvider store={store}>
        <WalletWrapperProvider>
          <AuthProvider>
            <ChainProvider>
              <WalletLinkingProvider>
                <SuggestTokenProvider>
                  <SuggestChainProvider>{children}</SuggestChainProvider>
                </SuggestTokenProvider>
              </WalletLinkingProvider>
            </ChainProvider>
          </AuthProvider>
        </WalletWrapperProvider>
      </ReduxProvider>
    </ThemesProvider>
  )
}
