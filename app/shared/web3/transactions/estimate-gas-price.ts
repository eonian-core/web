import type { Provider } from 'ethers'
import { ethers } from 'ethers'

import VaultABI from '../abi/Vault.json'

interface GasPriceEstimation {
  deposit: bigint
  withdraw: bigint
}

const MAX_GAS_ESTIMATION_ATTEMPTS = 3
const FALLBACK_DEPOSIT_GAS = 295000n
const FALLBACK_WITHDRAW_GAS = 305000n

const attempts: Record<string, number> = {}

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

  const attempt = attempts[vaultAddress] ?? 0
  if (attempt >= MAX_GAS_ESTIMATION_ATTEMPTS) {
    return {
      deposit: FALLBACK_DEPOSIT_GAS * gasPrice,
      withdraw: FALLBACK_WITHDRAW_GAS * gasPrice,
    }
  }

  let depositGas: bigint | null = null
  let withdrawGas: bigint | null = null
  try {
    const contract = new ethers.Contract(vaultAddress, VaultABI, signer)
    depositGas = await contract.deposit.estimateGas(100000000000n)
    withdrawGas = await contract.withdraw.estimateGas(100000000000n)
  }
  catch (e) {
    console.warn('Unable to estimate gas:', e)
    attempts[vaultAddress] ??= 0
    attempts[vaultAddress] += 1
  }

  return {
    deposit: (depositGas ?? FALLBACK_DEPOSIT_GAS) * gasPrice,
    withdraw: (withdrawGas ?? FALLBACK_WITHDRAW_GAS) * gasPrice,
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
