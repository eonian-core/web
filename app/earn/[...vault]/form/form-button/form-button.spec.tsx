import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PropsWithChildren } from 'react'
import type { VaultContextType } from '../../hooks/use-vault-context'
import { VaultContext } from '../../hooks/use-vault-context'
import { useHaveEnoughAssets } from './form-button'
import type { VaultUserSlice } from '@/store/slices/vaultUserSlice'
import { initialState } from '@/store/slices/vaultUserSlice'
import { FormAction } from '@/store/slices/types'

jest.mock('@web3-onboard/react', () => ({
  Web3OnboardProvider: jest.fn(),
  useConnectWallet: jest.fn(),
  useSetChain: jest.fn(),
}))

jest.mock('@web3-onboard/injected-wallets', () => jest.fn())
jest.mock('@web3-onboard/walletconnect', () => jest.fn())
jest.mock('@web3-onboard/core', () => jest.fn())

function genWrapper(state: Partial<VaultUserSlice> = {}, vault: Partial<VaultContextType> = {}) {
  const vaultUserSlice = createSlice({
    name: 'vaultUser',
    initialState: {
      ...initialState,
      ...state,
    },
    reducers: {},
  })
  const store = configureStore({
    reducer: {
      vaultUser: vaultUserSlice.reducer,
    },
  })

  const wrapper = ({ children }: PropsWithChildren) => (<Provider store={store}>
        <VaultContext.Provider value={{
          inputValue: undefined,
          formAction: FormAction.DEPOSIT,
          ...vault,
        } as VaultContextType}>
            {children}
        </VaultContext.Provider>
    </Provider>)
  return wrapper
}

const generateRandomArray = (length: number, max: number) => Array.from({ length }, () => Math.floor(Math.random() * max))

describe('useHaveEnoughAssets', () => {
  it.each([0, ...generateRandomArray(10, 10000)])('should return true when the wallet balance is greater than the input value', (n: number) => {
    const wrapper = genWrapper({ walletBalanceBN: '2000', vaultBalanceBN: `${n}` }, { inputValue: BigInt('1000') })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(true)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return false when the wallet balance is less than the input value', (n: number) => {
    const wrapper = genWrapper({ walletBalanceBN: '1000', vaultBalanceBN: `${n}` }, { inputValue: BigInt('2000') })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(false)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return true when the wallet balance is equal to the input value', (n: number) => {
    const wrapper = genWrapper({ walletBalanceBN: '1000', vaultBalanceBN: `${n}` }, { inputValue: BigInt('1000') })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(true)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return true when the input value is not defined', (n: number) => {
    const wrapper = genWrapper({ walletBalanceBN: '1000', vaultBalanceBN: `${n}` }, { inputValue: undefined })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(true)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return true when the vault balance is greater than the input value in WITHDRAW case', (n: number) => {
    const wrapper = genWrapper({ vaultBalanceBN: '2000', walletBalanceBN: `${n}` }, { inputValue: BigInt('1000'), formAction: FormAction.WITHDRAW })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(true)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return false when the vault balance is less than the input value in WITHDRAW case', (n: number) => {
    const wrapper = genWrapper({ vaultBalanceBN: '1000', walletBalanceBN: `${n}` }, { inputValue: BigInt('2000'), formAction: FormAction.WITHDRAW })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(false)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return true when the vault balance is equal to the input value in WITHDRAW case', (n: number) => {
    const wrapper = genWrapper({ vaultBalanceBN: '1000', walletBalanceBN: `${n}` }, { inputValue: BigInt('1000'), formAction: FormAction.WITHDRAW })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(true)
  })

  it.each([0, ...generateRandomArray(10, 10000)])('should return true when the input value is not defined in WITHDRAW case', (n: number) => {
    const wrapper = genWrapper({ vaultBalanceBN: '1000', walletBalanceBN: `${n}` }, { inputValue: undefined, formAction: FormAction.WITHDRAW })
    const { result } = renderHook(() => useHaveEnoughAssets(), { wrapper })

    expect(result.current).toBe(true)
  })
})
