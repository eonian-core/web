import { useEffect, useMemo } from 'react'
import type { Vault } from '../../../api'
import { useWalletWrapperContext } from '../../../providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '../../../providers/wallet/wrappers/types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchVaultUserData, reset } from '../../../store/slices/vaultUserSlice'
import { useRefetch } from './use-refetch'

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

  const refetch = useMemo(() => {
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

  useRefetch({
    status: loadingStatus,
    autoUpdateInterval,
    forceUpdate: true,
  }, refetch)

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

  return refetch
}
