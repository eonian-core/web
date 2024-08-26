import { JsonRpcProvider } from 'ethers'
import { useEffect } from 'react'
import type { Vault } from '../gql/graphql'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'
import { getRPCEndpoint } from '@/providers/wallet/wrappers/helpers'
import { useAppDispatch } from '@/store/hooks'
import { fetchPositionInfo } from '@/store/slices/positionInfoSlice'

/**
 * Gets the user's invested position in each vault in the list.
 * @param chainId The ID of the currently selected chain.
 * @param vaults A list of vaults from which to get the position.
 */
export function useFetchPositionInfo(chainId: ChainId, vaults: Vault[]) {
  const { wallet, chain, provider } = useWalletWrapperContext()
  const walletAddress = wallet?.address
  const multicallAddress = chain?.multicallAddress
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!multicallAddress || !walletAddress || !provider || vaults.length === 0)
      return

    const endpoint = getRPCEndpoint(chainId)
    if (!endpoint)
      return

    void dispatch(
      fetchPositionInfo({
        walletAddress,
        vaultAddresses: vaults.map(vault => vault.address),
        multicallAddress,
        provider: new JsonRpcProvider(endpoint),
      }),
    )
  }, [vaults, chainId, dispatch, provider, multicallAddress, walletAddress])
}
