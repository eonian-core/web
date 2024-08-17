import { useEffect, useMemo } from 'react'
import { useRefetch } from './use-refetch'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { asyncFetchWalletLinkPreview, reset } from '@/store/slices/walletLinkPreviewSlice'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { RequestStatus } from '@/store/slices/requestSlice'

export function useWalletLinkPreview() {
  const dispatch = useAppDispatch()
  // TODO: migrate from redux to react-query
  const { status: loadingStatus, address: linkedWalletAddress, chainId: linkedWalletChainId, link } = useAppSelector(state => state.walletLinkPreview)

  const { wallet, chain, status } = useWalletWrapperContext()
  const { address } = wallet ?? {}

  const isLinkForCurrentWallet = linkedWalletAddress === address && chain?.id === linkedWalletChainId

  const refetch = useMemo(() => {
    if (!address || !chain?.id)
      return null

    return async () => {
      if (loadingStatus !== RequestStatus.Idle)
        return

      if ((!!address && !!linkedWalletAddress) && !isLinkForCurrentWallet) {
        dispatch(reset())
        return
      }

      await dispatch(asyncFetchWalletLinkPreview({
        address,
        chainId: chain.id,
      }))
    }
  }, [dispatch, address, linkedWalletAddress, chain?.id, loadingStatus, isLinkForCurrentWallet])

  // request data when something changed
  useRefetch({
    status: loadingStatus,
  }, refetch)

  /**
   * Resets vault-user data when wallet is disconnected.
   */
  useEffect(() => {
    if (status === WalletStatus.NOT_CONNECTED)
      dispatch(reset())
  }, [status, dispatch])

  return [isLinkForCurrentWallet ? link : undefined, loadingStatus] as const
}
