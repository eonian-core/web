import { useEffect } from 'react'
import { executeAfter } from '@/shared/async/execute-after'
import { RequestStatus } from '@/store/slices/requestSlice'

export interface RefetchOptions {
  status: RequestStatus
  autoUpdateInterval?: number
  forceUpdate?: boolean
}

/** Connection pooling strategy for update data */
export function useRefetch({ status, autoUpdateInterval, forceUpdate }: RefetchOptions, requestUpdate: (() => Promise<any>) | null) {
  /**
   * Retrieves fresh data when something changed (wallet/vault/chain).
   */
  useEffect(() => {
    if (!forceUpdate && [RequestStatus.Pending, RequestStatus.Succeeded].includes(status))
      return

    void requestUpdate?.()
  }, [requestUpdate])

  /**
   * Performs automatic updates at fixed intervals.
   * Only if {@link autoUpdateInterval} is specified.
   */
  useEffect(() => {
    if (status === RequestStatus.Pending || !autoUpdateInterval)
      return

    return executeAfter(autoUpdateInterval, () => {
      void requestUpdate?.()
    })
  }, [autoUpdateInterval, status, requestUpdate])
}
