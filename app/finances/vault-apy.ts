import { calculateVaultAPY } from './apy'
import type { Vault } from '@/api'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import type { TokenSymbol } from '@/types'

/**
 * Based on year of returns from staging environment,
 * TODO: switch to latest when production environment will have enough data points
 * Additional source: https://defillama.com/protocol/apeswap-lending#yields
 */
const PRECISE_YEAR_APY: Partial<{ [key in TokenSymbol]: number }> = {
  BTCB: 47, // 0.47%
  ETH: 34, // 0.34%
  USDT: 1539, // 15.39%
  USDC: 1360, // 13.6%
}

export function getYearlyApy(vault: Vault, precision?: number) {
  const symbol = getAssetSymbol(vault)
  const apy = PRECISE_YEAR_APY[symbol]
  if (apy)
    return apy / (precision || 100)

  // falback to latest if not have precise data
  return calculateVaultAPY(vault.rates[0].apy.yearly, vault.asset.decimals, precision)
}
