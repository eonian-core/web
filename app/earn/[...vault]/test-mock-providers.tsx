/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Provider } from 'react-redux'
import type { PayloadAction } from '@reduxjs/toolkit'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { type PropsWithChildren, useCallback, useState } from 'react'
import type { VaultContextType } from './hooks/use-vault-context'
import { VaultContext } from './hooks/use-vault-context'
import type { VaultUserSlice } from '@/store/slices/vaultUserSlice'
import { initialState } from '@/store/slices/vaultUserSlice'
import { FormAction } from '@/store/slices/types'
import type { WalletWrapperContextValue } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'

export function genWrapper(state: Partial<VaultUserSlice> = {}, vault: Partial<VaultContextType> = {}, walletContext: Partial<WalletWrapperContextValue> = {}) {
  const vaultUserSlice = createSlice({
    name: 'vaultUser',
    initialState: {
      ...initialState,
      ...state,
    },
    reducers: {
      setState: (s, a: PayloadAction<Partial<VaultUserSlice>>) => ({ ...s, ...a.payload }),
    },
  })
  const store = configureStore({
    reducer: {
      vaultUser: vaultUserSlice.reducer,
    },
  })

  const Wrapper = ({ children }: PropsWithChildren) => {
    const [walletState, setPureWalletState] = useState<WalletWrapperContextValue>({
      wallet: null,
      status: WalletStatus.NOT_CONNECTED,
      chain: null,
      chains: [],
      provider: null,
      connect: () => Promise.resolve(),
      disconnect: () => Promise.resolve(),
      setCurrentChain: () => Promise.resolve(),
      ...walletContext,
    })
    const setWalletState = useCallback((wallet: Partial<WalletWrapperContextValue>) => {
      setPureWalletState(prev => ({ ...prev, ...wallet }))
    }, [setPureWalletState])

    return (
            <Provider store={store}>
                <WalletWrapperContext.Provider value={{ ...walletState, setWalletState } as any}>
                    <VaultContext.Provider value={{
                      inputValue: undefined,
                      formAction: FormAction.DEPOSIT,
                      ...vault,
                    } as VaultContextType}>
                        {children}
                    </VaultContext.Provider>
                </WalletWrapperContext.Provider>
            </Provider>
    )
  }

  const { setState } = vaultUserSlice.actions
  return { wrapper: Wrapper, store, setState }
}

export const generateRandomArray = (length: number, max: number) => Array.from({ length }, () => Math.floor(Math.random() * max))
