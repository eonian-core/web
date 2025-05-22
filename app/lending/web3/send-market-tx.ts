import { Contract, ethers } from 'ethers'
import MarketABI from './abi/MarketABI.json'
import ComptrollerABI from './abi/ComptrollerABI.json'
import ERC20ABI from '@/shared/web3/abi/ERC20.json'

export async function approveERC20(
  signer: ethers.JsonRpcSigner,
  tokenAddress: string,
  spenderAddress: string,
  amount: bigint,
): Promise<ethers.TransactionReceipt | null> {
  const contract = new ethers.Contract(tokenAddress, ERC20ABI, signer)
  const response = (await contract.approve(spenderAddress, amount)) as ethers.TransactionResponse
  return response.wait()
}

export async function supply(
  signer: ethers.JsonRpcSigner,
  marketAddress: string,
  amount: bigint,
) {
  const market = new Contract(marketAddress, MarketABI, signer)
  const response = (await market.mint(amount)) as ethers.TransactionResponse
  return response.wait()
}

export async function withdraw(
  signer: ethers.JsonRpcSigner,
  marketAddress: string,
  amount: bigint,
) {
  const market = new Contract(marketAddress, MarketABI, signer)
  const response = (await market.redeemUnderlying(amount)) as ethers.TransactionResponse
  return response.wait()
}

export async function borrow(
  signer: ethers.JsonRpcSigner,
  marketAddress: string,
  amount: bigint,
) {
  const market = new Contract(marketAddress, MarketABI, signer)
  const response = (await market.borrow(amount)) as ethers.TransactionResponse
  return response.wait()
}

export async function repay(
  signer: ethers.JsonRpcSigner,
  marketAddress: string,
  amount: bigint,
) {
  const market = new Contract(marketAddress, MarketABI, signer)
  const response = (await market.repayBorrow(amount)) as ethers.TransactionResponse
  return response.wait()
}

export async function enterMarkets(
  signer: ethers.JsonRpcSigner,
  comptrollerAddress: string,
) {
  const comptroller = new Contract(comptrollerAddress, ComptrollerABI, signer)

  // Get all markets from the comptroller
  const marketsResult = await comptroller.getAllMarkets() as string[]

  // Convert to regular array to avoid read-only properties issue
  const markets = [...marketsResult]

  // Enter all markets
  const response = await comptroller.enterMarkets(markets) as ethers.TransactionResponse
  return response.wait()
}
