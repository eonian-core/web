import { redirect } from 'next/navigation'
import type { Vault } from '../../api'
import { getProtocolRscClient, getVaultBySymbol, getVaultsSymbols } from '../../api'
import { ChainId } from '../../providers/wallet/wrappers/helpers'
import { defaultChain } from '../../web3-onboard'
import { showEarn } from '../../features'

import styles from './page.module.scss'
import { Header } from './header/header'
import { TokenGradient } from './header/token-gradient'
import { Content } from './content/content'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import { convertToUsd } from '@/finances/usd'

export const revalidate = 10

interface RouteSegment {
  vault: [chainName: string, vaultSymbol: string] | [chainName: string]
}

interface Params {
  params: Partial<RouteSegment>
}

/**
 * Generates static page for each vault in every supported chain.
 * FIXME: For the alpha release, we can only use the default chain (BSC).
 */
export async function generateStaticParams(): Promise<RouteSegment[]> {
  const chainId = ChainId.parse(defaultChain.id)
  const client = getProtocolRscClient(chainId)
  const { data } = await getVaultsSymbols(client)
  return data.vaults.map(({ symbol }) => ({ vault: [ChainId.getName(chainId).toLowerCase(), symbol] }))
}

export default async function Page({ params }: Params) {
  const { vault: vaultRoute = [] } = params

  if (!showEarn)
    redirect('/')

  if (vaultRoute.length !== 2)
    redirect('/earn/')

  const [chainName, vaultSymbol] = vaultRoute
  const chainId = ChainId.getByName(chainName)
  const vault = await getVaultBySimbol(chainId, vaultSymbol)
  const symbol = getAssetSymbol(vault)

  const currentPrice = convertToUsd(vault.asset.price)

  return (
    <>
      <TokenGradient symbol={symbol} />
      <div className={styles.page}>
        <Header {...{ symbol, currentPrice }}/>
        <Content {...{ symbol, vault, chainId }} />
      </div>
    </>
  )
}

async function getVaultBySimbol(chainId: ChainId, vaultSymbol: string) {
  const client = getProtocolRscClient(chainId)
  const { data } = await getVaultBySymbol(client, vaultSymbol)
  const vault = data.vaults[0]
  if (!vault)
    throw new Error(`Vault with symbol "${vaultSymbol}" not found`)

  return vault as Vault
}
