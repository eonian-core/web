import { ChainId } from "@/providers/wallet/wrappers/helpers"
import { supportedChainsIds } from "@/web3-onboard"
import { getClient } from "../apollo.rsc-client"
import { Vault } from "../gql/graphql"
import { getVaults } from "../queries"

export type VaultsByChain = Record<ChainId, Vault[]>

/** Can be invokend only in server components */
export async function fetchVaults() {
    const promises = supportedChainsIds.map(fetchVault)

    return (await Promise.all(promises))
        .reduce((map, result, index) => {
            map[supportedChainsIds[index]] = result
            return map
        }, {} as VaultsByChain)
}

async function fetchVault(chainId: ChainId): Promise<Vault[]> {
    try {
        const client = getClient(chainId)
        const { data } = await getVaults(client)
        return data.vaults as Vault[]
    }
    catch (e) {
        console.warn('Failed to fetch vaults for chain:', chainId, '\nError:', e)
        return []
    }
}