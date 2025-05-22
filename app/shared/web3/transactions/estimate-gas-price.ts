import type { Provider, ethers } from 'ethers'

interface GasPriceEstimation {
  deposit: bigint
  withdraw: bigint
}

const FALLBACK_DEPOSIT_GAS = 295000n
const FALLBACK_WITHDRAW_GAS = 305000n

export async function estimateGasPriceOfActions(
  vaultAddress: string,
  provider: Provider,
): Promise<GasPriceEstimation | null> {
  const signer = await getSigner(provider)
  if (signer === null)
    return null

  let gasPrice: bigint | null = null
  try {
    const feeData = await provider.getFeeData()
    gasPrice = feeData.gasPrice
  }
  catch (e) {
    console.warn('Unable to get gas price:', e)
  }

  if (gasPrice === null)
    return null

  return {
    deposit: FALLBACK_DEPOSIT_GAS * gasPrice,
    withdraw: FALLBACK_WITHDRAW_GAS * gasPrice,
  }
}

async function getSigner(provider: Provider): Promise<ethers.JsonRpcSigner | null> {
  try {
    const browserProvider = provider as ethers.BrowserProvider
    return await browserProvider.getSigner()
  }
  catch (e) {
    console.warn('Unable to get signer:', e)
  }
  return null
}
