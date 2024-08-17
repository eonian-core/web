import React, { useEffect } from 'react'
import type { Vault } from '../../../api'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { executeAfter } from '../../../shared/async/execute-after'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchVaultUserData, reset } from '../../../store/slices/vaultUserSlice'
import { RequestStatus } from '@/store/slices/requestSlice'

interface VaultUserInfoParams {
  autoUpdateInterval?: number
}

export function useVaultUserInfo({
  address: vaultAddress,
  asset: { address: assetAddress },
}: Vault,
{ autoUpdateInterval }: VaultUserInfoParams = {},
) {
  const dispatch = useAppDispatch()
  const { status: loadingStatus } = useAppSelector(state => state.vaultUser)

  const { wallet, provider, chain, status } = useWalletWrapperContext()
  const { multicallAddress } = chain ?? {}
  const { address: walletAddress } = wallet ?? {}

  const refetch = React.useMemo(() => {
    if (!walletAddress || !multicallAddress || !provider)
      return null

    return async () => {
      await dispatch(fetchVaultUserData({
        walletAddress,
        vaultAddress,
        assetAddress,
        multicallAddress,
        provider,
      }))
    }
  }, [dispatch, walletAddress, vaultAddress, assetAddress, multicallAddress, provider])

  /**
   * Retrieves fresh data when something changed (wallet/vault/chain).
   */
  useEffect(() => {
    void refetch?.()
  }, [refetch])

  /**
   * Resets vault-user data when wallet is disconnected.
   */
  useEffect(() => {
    if (status === WalletStatus.NOT_CONNECTED)
      dispatch(reset())
  }, [status, dispatch])

  /**
   * Resets vault-user data after leaving the page.
   */
  useEffect(
    () => () => {
      dispatch(reset())
    },
    [dispatch],
  )

  /**
   * Performs automatic updates at fixed intervals.
   * Only if {@link autoUpdateInterval} is specified.
   */
  useEffect(() => {
    if (loadingStatus === RequestStatus.Pending || !autoUpdateInterval)
      return

    return executeAfter(autoUpdateInterval, () => {
      void refetch?.()
    })
  }, [autoUpdateInterval, loadingStatus, refetch])

  return refetch
}
