import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { SliceRequestState } from './requestSlice'
import { addRequestHandlingStates, initialRequestState } from './requestSlice'
import type { LinkPreview } from '@/api/wallet-linking/gql/graphql'
import { fetchWalletLinkPreview } from '@/api/wallet-linking/wallet/fetch-wallet-preview'

export interface FetchWalletLinkPreviewArguments {
  address: string
  chainId: number
}

export const asyncFetchWalletLinkPreview = createAsyncThunk(
  'walletLinkPreview/asyncFetchWalletLinkPreview',
  async ({ address, chainId }: FetchWalletLinkPreviewArguments) => {
    try {
      const data = await fetchWalletLinkPreview(address, chainId)
      return data
    }
    catch (e) {
      console.warn('Failed to fetch wallet preview for address:', address, '\nError:', e)
      throw e
    }
  },
)

export interface WalletLinkPreviewSlice extends SliceRequestState {
  address?: string | null
  chainId?: number | null
  link?: LinkPreview | null
}

export const initialState: WalletLinkPreviewSlice = {
  ...initialRequestState,
  link: null,
}

const walletLinkPreviewSlice = createSlice({
  name: 'walletLinkPreview',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    addRequestHandlingStates(builder, asyncFetchWalletLinkPreview, (state, { payload }) => {
      state.address = payload?.address
      state.chainId = payload?.chainId
      state.link = payload?.link
    })
  },
})

export const { reset } = walletLinkPreviewSlice.actions
export default walletLinkPreviewSlice.reducer
