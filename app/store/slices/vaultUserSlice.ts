import type { Provider } from 'ethers'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { MulticallRequest } from '../../shared'
import { Multicall, createERC20Request, createVaultRequest } from '../../shared'
import type { SliceRequestState } from './requestSlice'
import { addRequestHandlingStates, initialRequestState } from './requestSlice'
import { estimateGasPriceOfActions } from '@/shared/web3/transactions/estimate-gas-price'

interface FetchParams {
  walletAddress: string
  assetAddress: string
  vaultAddress: string
  multicallAddress: string
  provider: Provider
}

export const fetchVaultUserData = createAsyncThunk(
  'vaultUser/multicall',
  async ({ walletAddress, assetAddress, vaultAddress, multicallAddress, provider }: FetchParams) => {
    const requests = getRequests(walletAddress, assetAddress, vaultAddress)
    const multicall = new Multicall(multicallAddress, provider, requests)
    const responses = await multicall.makeRequest()
    const errorIndex = responses.findIndex(response => !response.success)

    const nativeBalance = await provider.getBalance(walletAddress)
    const gasPriceOfActions = await estimateGasPriceOfActions(vaultAddress, provider)

    if (errorIndex >= 0)
      throw new Error(`Error occured when requesting: ${JSON.stringify(requests[errorIndex])}`)

    return {
      // Redux doesn't allow to store BigInt(s) in the store (https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)
      // So we need to convert it back to string and keep big number in string representation.
      data: responses.map(response => (response.data as object).toString()),
      nativeBalance,
      gasPriceOfActions,
      requestForWallet: walletAddress,
    }
  },
)

// TODO: add lint rule to enforce export all interfaces
export interface VaultUserSlice extends SliceRequestState {
  walletBalanceBN: string
  vaultBalanceBN: string
  assetAllowanceBN: string
  nativeWalletBalanceBN: string
  depositGasPriceBN: string
  withdrawGasPriceBN: string
  vaultDecimals: number
  assetDecimals: number
  nativeDecimals: number
  lastRequestForWallet: string
}

export const initialState: VaultUserSlice = {
  ...initialRequestState,
  walletBalanceBN: '0',
  vaultBalanceBN: '0',
  assetAllowanceBN: '0',
  nativeWalletBalanceBN: '0',
  depositGasPriceBN: '0',
  withdrawGasPriceBN: '0',
  vaultDecimals: 0,
  assetDecimals: 0,
  nativeDecimals: 0,
  lastRequestForWallet: '',
}

const vaultUserSlice = createSlice({
  name: 'vaultUser',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    addRequestHandlingStates(builder, fetchVaultUserData, (state, action) => {
      const { data, nativeBalance, gasPriceOfActions, requestForWallet } = action.payload
      const [vaultBalance, vaultDecimals, assetBalance, assetDecimals, assetAllowance] = data

      state.assetAllowanceBN = assetAllowance
      state.walletBalanceBN = assetBalance
      state.assetDecimals = Number.parseInt(assetDecimals)

      state.vaultBalanceBN = vaultBalance
      state.vaultDecimals = Number.parseInt(vaultDecimals)

      state.nativeWalletBalanceBN = nativeBalance.toString()
      state.nativeDecimals = 18 // Always 18 for EVM-compatible chains

      if (gasPriceOfActions) {
        state.depositGasPriceBN = gasPriceOfActions.deposit.toString()
        state.withdrawGasPriceBN = gasPriceOfActions.withdraw.toString()
      }

      state.lastRequestForWallet = requestForWallet
    })
  },
})

function getRequests(walletAddress: string, assetAddress: string, vaultAddress: string): MulticallRequest[] {
  return [
    createVaultRequest(vaultAddress, 'maxWithdraw', [walletAddress]),
    createVaultRequest(vaultAddress, 'decimals'),
    createERC20Request(assetAddress, 'balanceOf', [walletAddress]),
    createERC20Request(assetAddress, 'decimals'),
    createERC20Request(assetAddress, 'allowance', [walletAddress, vaultAddress]),
  ]
}

export const { reset } = vaultUserSlice.actions
export default vaultUserSlice.reducer
