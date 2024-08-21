import type { ActionReducerMapBuilder, AsyncThunk, CaseReducer, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { AsyncThunkFulfilledActionCreator } from '@reduxjs/toolkit/dist/createAsyncThunk'

// Unfortunaly real AsyncThunkConfig do not exported in @reduxjs/toolkit
interface dAsyncThunkConfig {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Succeeded = 'succeeded',
  Rejected = 'rejected',
}

// Base logic for handling requests in redux
export interface SliceRequestState {
  status: RequestStatus
  error: any | null
}

export const initialRequestState: SliceRequestState = {
  status: RequestStatus.Idle,
  error: null,
}

export function addRequestHandlingStates<S extends SliceRequestState = SliceRequestState, R = any, T = any, C extends dAsyncThunkConfig = any>(builder: ActionReducerMapBuilder<S>,
  thunk: AsyncThunk<R, T, C>,
  onFulfillment: CaseReducer<S, ReturnType<AsyncThunkFulfilledActionCreator<R, T, C>>>) {
  builder
    .addCase(thunk.pending, (state, action) => {
      state.status = RequestStatus.Pending
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = RequestStatus.Succeeded
      onFulfillment(state, action)
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = RequestStatus.Rejected
      state.error = (action as PayloadAction<any, any, any, string>).error ?? 'Unknown Error'
    })
}
