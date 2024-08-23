/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { act, renderHook } from '@testing-library/react'
import type { ethers } from 'ethers'
import { genWrapper } from '../test-mock-providers'
import { fetchVaultUserData, reset } from '../../../store/slices/vaultUserSlice'
import { useVaultUserInfo } from './use-vault-user-info'
import type { Vault } from '@/api'
import type { Chain, Wallet } from '@/providers/wallet/wrappers/types'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { RequestStatus } from '@/store/slices/requestSlice'

jest.mock('@web3-onboard/react', () => ({
  Web3OnboardProvider: jest.fn(),
  useConnectWallet: jest.fn(),
  useSetChain: jest.fn(),
}))

jest.mock('@web3-onboard/injected-wallets', () => jest.fn())
jest.mock('@web3-onboard/walletconnect', () => jest.fn())
jest.mock('@web3-onboard/core', () => jest.fn())

jest.mock('../../../store/slices/vaultUserSlice', () => {
  const originalModule: any = jest.requireActual('../../../store/slices/vaultUserSlice')

  return {
    __esModule: true,
    ...originalModule,
    fetchVaultUserData: jest.fn(() => Promise.resolve()),
    reset: jest.fn(),
  }
})

const dispatch = jest.fn()

jest.mock('react-redux', () => {
  const originalModule: any = jest.requireActual('react-redux')

  return {
    __esModule: true,
    ...originalModule,
    useDispatch: jest.fn(() => dispatch),
    useOriginalDispatch: originalModule.useDispatch,
  }
})

expect.extend({
  toBeFunctionOrLambda(received) {
    const pass = typeof received === 'function'
    if (pass) {
      return {
        message: () => `expected ${received} not to be a function or lambda`,
        pass: true,
      }
    }
    else {
      return {
        message: () => `expected ${received} to be a function or lambda`,
        pass: false,
      }
    }
  },
})

describe('useVaultUserInfo', () => {
  beforeEach(() => {
    // @ts-expect-error
    fetchVaultUserData.mockClear()
    // @ts-expect-error
    reset.mockClear()
    dispatch.mockClear()
  })

  it('should return lambda or null based on state', () => {
    const { wrapper } = genWrapper({ status: RequestStatus.Succeeded }, { }, {
      wallet: { address: 'wallet-address' } as Wallet,
      chain: { multicallAddress: 'multicall-address' } as Chain,
      provider: { id: 'provider' } as any as ethers.BrowserProvider,
      status: WalletStatus.NOT_CONNECTED,
    })
    const vault = { address: 'vault-address', asset: { address: 'asset-address' } } as Vault
    const autoUpdateInterval = undefined

    const { result } = renderHook(() => {
      // @ts-expect-error
      const { setWalletState } = useWalletWrapperContext()
      const vaultUserInfo = useVaultUserInfo(vault, { autoUpdateInterval })

      return { vaultUserInfo, setWalletState }
    }, { wrapper })
    expect(result.current.vaultUserInfo).toBeFunctionOrLambda()

    act(() => {
      result.current.setWalletState({ wallet: null })
    })
    expect(result.current.vaultUserInfo).toBeNull()

    act(() => {
      result.current.setWalletState({ wallet: { address: 'wallet-address' } as Wallet })
    })
    expect(result.current.vaultUserInfo).toBeFunctionOrLambda()

    act(() => {
      result.current.setWalletState({ chain: null })
    })
    expect(result.current.vaultUserInfo).toBeNull()

    act(() => {
      result.current.setWalletState({ chain: { multicallAddress: 'multicall-address' } as Chain })
    })
    expect(result.current.vaultUserInfo).toBeFunctionOrLambda()

    act(() => {
      result.current.setWalletState({ provider: null })
    })
    expect(result.current.vaultUserInfo).toBeNull()

    act(() => {
      result.current.setWalletState({ provider: { id: 'provider' } as any as ethers.BrowserProvider })
    })
    expect(result.current.vaultUserInfo).toBeFunctionOrLambda()
  })

  it('should trigger dispatch fetchVaultUserData', async () => {
    const { wrapper } = genWrapper({ status: RequestStatus.Succeeded }, { }, {
      wallet: { address: 'wallet-address' } as Wallet,
      chain: { multicallAddress: 'multicall-address' } as Chain,
      provider: { id: 'provider' } as any as ethers.BrowserProvider,
      status: WalletStatus.CONNECTED,
    })
    const vault = { address: 'vault-address', asset: { address: 'asset-address' } } as Vault
    const autoUpdateInterval = undefined

    const { result } = renderHook(() => {
      // @ts-expect-error
      const { setWalletState } = useWalletWrapperContext()
      const vaultUserInfo = useVaultUserInfo(vault, { autoUpdateInterval })

      return { vaultUserInfo, setWalletState }
    }, { wrapper })

    expect(result.current.vaultUserInfo).toBeFunctionOrLambda()
    expect(fetchVaultUserData).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(fetchVaultUserData).toHaveBeenCalledWith({
      walletAddress: 'wallet-address',
      vaultAddress: 'vault-address',
      assetAddress: 'asset-address',
      multicallAddress: 'multicall-address',
      provider: { id: 'provider' } as any as ethers.BrowserProvider,
    })

    await act(async () => {
      await result.current.vaultUserInfo?.()
    })

    expect(fetchVaultUserData).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(fetchVaultUserData).toHaveBeenCalledWith({
      walletAddress: 'wallet-address',
      vaultAddress: 'vault-address',
      assetAddress: 'asset-address',
      multicallAddress: 'multicall-address',
      provider: { id: 'provider' } as any as ethers.BrowserProvider,
    })

    act(() => {
      result.current.setWalletState({ wallet: { address: 'wallet-address2' } as Wallet })
    })

    expect(fetchVaultUserData).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(fetchVaultUserData).toHaveBeenCalledWith({
      walletAddress: 'wallet-address2',
      vaultAddress: 'vault-address',
      assetAddress: 'asset-address',
      multicallAddress: 'multicall-address',
      provider: { id: 'provider' } as any as ethers.BrowserProvider,
    })

    act(() => {
      result.current.setWalletState({ chain: { multicallAddress: 'multicall-address2' } as Chain })
    })

    expect(fetchVaultUserData).toHaveBeenCalledTimes(4)
    expect(dispatch).toHaveBeenCalledTimes(4)
    expect(fetchVaultUserData).toHaveBeenCalledWith({
      walletAddress: 'wallet-address2',
      vaultAddress: 'vault-address',
      assetAddress: 'asset-address',
      multicallAddress: 'multicall-address2',
      provider: { id: 'provider' } as any as ethers.BrowserProvider,
    })

    act(() => {
      result.current.setWalletState({ provider: { id: 'provider2' } as any as ethers.BrowserProvider })
    })

    expect(fetchVaultUserData).toHaveBeenCalledTimes(5)
    expect(dispatch).toHaveBeenCalledTimes(5)
    expect(fetchVaultUserData).toHaveBeenCalledWith({
      walletAddress: 'wallet-address2',
      vaultAddress: 'vault-address',
      assetAddress: 'asset-address',
      multicallAddress: 'multicall-address2',
      provider: { id: 'provider2' } as any as ethers.BrowserProvider,
    })
    expect(reset).toHaveBeenCalledTimes(0)

    act(() => {
      result.current.setWalletState({ status: WalletStatus.NOT_CONNECTED })
    })

    expect(fetchVaultUserData).toHaveBeenCalledTimes(5)
    expect(dispatch).toHaveBeenCalledTimes(6)
    expect(reset).toHaveBeenCalledTimes(1)
  })
})
