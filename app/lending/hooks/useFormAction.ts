import { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import type { CreateToastOptions } from '../components/toast'
import { ToastActionStatus, ToastActionType, createToast } from '../components/toast'
import { approveERC20, borrow, enterMarkets, repay, supply, withdraw } from '../web3/send-market-tx'
import { FormTab } from '../components/form/types'
import type { FormData } from '../LendingState'
import { differenceFactorScaled } from '../web3/utils'
import AddressBook from '../web3/address-book.json'
import type { NumberInputValue } from './useNumberInputValue'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import type { ChainId } from '@/providers/wallet/wrappers/helpers'

const formAction: Record<FormTab, (signer: ethers.JsonRpcSigner, marketAddress: string, amount: bigint) => Promise<ethers.TransactionReceipt | null>> = {
  [FormTab.SUPPLY]: supply,
  [FormTab.BORROW]: borrow,
  [FormTab.REPAY]: repay,
  [FormTab.WITHDRAW]: withdraw,
}

const formActionStatus: Record<FormTab, ToastActionType> = {
  [FormTab.SUPPLY]: ToastActionType.SUPPLY,
  [FormTab.BORROW]: ToastActionType.BORROW,
  [FormTab.REPAY]: ToastActionType.REPAY,
  [FormTab.WITHDRAW]: ToastActionType.WITHDRAW,
}

export function useFormAction(formData: FormData | null, chainId: ChainId, refresh: () => Promise<void>) {
  const { provider } = useWalletWrapperContext()
  const [isPending, setIsPending] = useState(false)

  const handleFormAction = useCallback(async (inputData: NumberInputValue): Promise<boolean> => {
    if (!formData)
      throw new Error('Form data is not set')

    if (!provider)
      throw new Error('Provider is not set')

    if (!inputData.value || !inputData.displayValue)
      throw new Error('Amount is not set')

    const signer = await provider.getSigner()
    const action = formAction[formData.tab]

    const options: CreateToastOptions = {
      type: formActionStatus[formData.tab],
      amount: inputData.displayValue,
      symbol: formData.market.symbol,
      status: ToastActionStatus.PENDING,
    }

    setIsPending(true)

    if (formData.tab === FormTab.SUPPLY) {
      const success = await enterMarketsIfNeeded(signer, formData, chainId)
      if (!success) {
        setIsPending(false)
        return false
      }
    }

    const amount = getInputAmount(formData, inputData.value)

    if (formData.tab === FormTab.SUPPLY || formData.tab === FormTab.REPAY) {
      const success = await approveIfNeeded(signer, formData, amount, inputData.displayValue)
      if (!success) {
        setIsPending(false)
        return false
      }
    }

    try {
      createToast(options)

      await action(signer, formData.market.address, amount)

      createToast({ ...options, status: ToastActionStatus.SUCCESS })

      await refresh()

      return true
    }
    catch (error) {
      console.error(error)
      createToast({ ...options, status: ToastActionStatus.ERROR })
    }
    finally {
      setIsPending(false)
    }
    return false
  }, [formData, provider, refresh])

  return { doFormAction: handleFormAction, isActionPending: isPending }
}

async function enterMarketsIfNeeded(signer: ethers.JsonRpcSigner, formData: FormData, chainId: ChainId): Promise<boolean> {
  if (formData.market.userPosition.isEntered)
    return true

  const options: CreateToastOptions = {
    type: ToastActionType.ENTER_MARKETS,
    amount: '0',
    symbol: formData.market.symbol,
    status: ToastActionStatus.PENDING,
  }
  try {
    createToast(options)
    const addresses = (AddressBook as unknown as Record<ChainId, { comptroller: string }>)[chainId]
    if (!addresses)
      throw new Error(`No addresses found for chainId: ${chainId}`)

    await enterMarkets(signer, addresses.comptroller)
    createToast({ ...options, status: ToastActionStatus.SUCCESS })
    return true
  }
  catch (error) {
    console.error(error)
    createToast({ ...options, status: ToastActionStatus.ERROR })
    return false
  }
}

async function approveIfNeeded(signer: ethers.JsonRpcSigner, formData: FormData, amount: bigint, amountToDisplay: string): Promise<boolean> {
  const { market } = formData
  if (market.userPosition.allowanceInUnderlying >= amount)
    return true

  const options: CreateToastOptions = {
    type: ToastActionType.APPROVE,
    amount: amountToDisplay,
    symbol: market.symbol,
    status: ToastActionStatus.PENDING,
  }
  try {
    createToast(options)
    await approveERC20(signer, market.underlyingAddress, market.address, amount)
    createToast({ ...options, status: ToastActionStatus.SUCCESS })
    return true
  }
  catch (error) {
    console.error(error)
    createToast({ ...options, status: ToastActionStatus.ERROR })
    return false
  }
}

function getInputAmount(formData: FormData, value: bigint): bigint {
  if (formData.tab === FormTab.REPAY) {
    const { borrowBalanceInUnderlying, walletBalanceInUnderlying } = formData.market.userPosition
    const decimals = 2
    const differenceFactor = differenceFactorScaled(borrowBalanceInUnderlying, value, decimals)
    const wantToRepayAll = differenceFactor === 10n ** BigInt(decimals) // The difference is too small to be considered (<1%)
    const hasEnoughToRepayAll = walletBalanceInUnderlying > borrowBalanceInUnderlying
    if (wantToRepayAll && hasEnoughToRepayAll) {
      // A value of 2^256 - 1 can be used to repay the full amount.
      return ethers.MaxUint256
    }
  }
  return value
}
