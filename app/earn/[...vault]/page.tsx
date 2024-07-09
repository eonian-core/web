import { redirect } from 'next/navigation'
import type { Vault } from '../../api'
import { getClient, getVaultBySymbol, getVaultsSymbols } from '../../api'
import { ChainId } from '../../providers/wallet/wrappers/helpers'
import { defaultChain } from '../../web3-onboard'
import { showEarn } from '../../features'
import { getAssetSymbol } from '../components/vault-card/vault-card-features'

import styles from './page.module.scss'
import { Header } from './header/header'
import { TokenGradient } from './header/token-gradient'
import { Content } from './content'
import { getYearPriceHistorical } from '@/api/coin-gecko'

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
  const client = getClient(chainId)
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
  const client = getClient(chainId)
  const { data } = await getVaultBySymbol(client, vaultSymbol)
  const vault = data.vaults[0] as Vault

  const symbol = getAssetSymbol(vault)
  const yearlyPriceData = await getYearPriceHistorical(symbol)

  return (
    <>
      <TokenGradient symbol={symbol} />
      <div className={styles.page}>
        <Header symbol={symbol} yearlyPriceData={yearlyPriceData} />
        <Content vault={vault} chainId={chainId} yearlyPriceData={yearlyPriceData} />
      </div>
    </>
  )
}
