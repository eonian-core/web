import type { ToastOptions, TypeOptions } from 'react-toastify'
import { toast } from 'react-toastify'
import { ActionToast } from './ActionToast'

export enum ToastActionType {
  SUPPLY = 'supply',
  BORROW = 'borrow',
  REPAY = 'repay',
  WITHDRAW = 'withdraw',
  APPROVE = 'approve',
  ENTER_MARKETS = 'enter-markets',
}

export enum ToastActionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ToastData {
  title: (amount: string, symbol: string) => string
  description?: (amount: string, symbol: string) => string
}

const toastData: Record<ToastActionType, Record<ToastActionStatus, ToastData>> = {
  [ToastActionType.SUPPLY]: {
    [ToastActionStatus.PENDING]: {
      title: (amount: string, symbol: string) => `Supplying ${amount} ${symbol}...`,
    },
    [ToastActionStatus.SUCCESS]: {
      title: () => 'Supply was successful',
      description: (amount: string, symbol: string) => `You have successfully supplied ${amount} ${symbol}`,
    },
    [ToastActionStatus.ERROR]: {
      title: () => 'Supply transaction failed',
      description: (amount: string, symbol: string) => `Something went wrong while supplying ${amount} ${symbol}`,
    },
  },
  [ToastActionType.BORROW]: {
    [ToastActionStatus.PENDING]: {
      title: (amount: string, symbol: string) => `Borrowing ${amount} ${symbol}...`,
    },
    [ToastActionStatus.SUCCESS]: {
      title: () => 'Borrow was successful',
      description: (amount: string, symbol: string) => `You have successfully borrowed ${amount} ${symbol}`,
    },
    [ToastActionStatus.ERROR]: {
      title: () => 'Borrow transaction failed',
      description: (amount: string, symbol: string) => `Something went wrong while borrowing ${amount} ${symbol}`,
    },
  },
  [ToastActionType.REPAY]: {
    [ToastActionStatus.PENDING]: {
      title: (amount: string, symbol: string) => `Repaying ${amount} ${symbol}...`,
    },
    [ToastActionStatus.SUCCESS]: {
      title: () => 'Repay was successful',
      description: (amount: string, symbol: string) => `You have successfully repaid ${amount} ${symbol}`,
    },
    [ToastActionStatus.ERROR]: {
      title: () => 'Repay transaction failed',
      description: (amount: string, symbol: string) => `Something went wrong while repaying ${amount} ${symbol}`,
    },
  },
  [ToastActionType.WITHDRAW]: {
    [ToastActionStatus.PENDING]: {
      title: (amount: string, symbol: string) => `Withdrawing ${amount} ${symbol}...`,
    },
    [ToastActionStatus.SUCCESS]: {
      title: () => 'Withdraw was successful',
      description: (amount: string, symbol: string) => `You have successfully withdrawn ${amount} ${symbol}`,
    },
    [ToastActionStatus.ERROR]: {
      title: () => 'Withdraw transaction failed',
      description: (amount: string, symbol: string) => `Something went wrong while withdrawing ${amount} ${symbol}`,
    },
  },
  [ToastActionType.APPROVE]: {
    [ToastActionStatus.PENDING]: {
      title: (amount: string, symbol: string) => `Approving ${amount} ${symbol}...`,
    },
    [ToastActionStatus.SUCCESS]: {
      title: () => 'Approve was successful',
      description: (amount: string, symbol: string) => `You have successfully approved ${amount} ${symbol}`,
    },
    [ToastActionStatus.ERROR]: {
      title: () => 'Approve transaction failed',
      description: (amount: string, symbol: string) => `Something went wrong while approving ${amount} ${symbol}`,
    },
  },
  [ToastActionType.ENTER_MARKETS]: {
    [ToastActionStatus.PENDING]: {
      title: () => 'Entering markets...',
    },
    [ToastActionStatus.SUCCESS]: {
      title: () => 'Markets entered successfully',
    },
    [ToastActionStatus.ERROR]: {
      title: () => 'Something went wrong while entering markets',
    },
  },
}

export interface CreateToastOptions {
  type: ToastActionType
  status: ToastActionStatus
  amount: string
  symbol: string
}

export function createToast({ type, amount, symbol, status }: CreateToastOptions) {
  const data = toastData[type][status]

  const getToastType = (): TypeOptions | undefined => {
    switch (status) {
      case ToastActionStatus.ERROR:
        return 'error'
      case ToastActionStatus.SUCCESS:
        return 'success'
      default:
        return undefined
    }
  }

  const getAutoClose = (): number | false => {
    if (status === ToastActionStatus.PENDING)
      return false

    return 5000
  }

  const element = (
    <ActionToast
      title={data.title(amount, symbol)}
      description={data.description?.(amount, symbol)}
      isLoading={status === ToastActionStatus.PENDING}
    />
  )

  const options: ToastOptions = {
    closeOnClick: false,
    toastId: type,
    progress: 0,
    autoClose: getAutoClose(),
    type: getToastType(),
  }

  if (toast.isActive(type)) {
    return toast.update(type, {
      render: element,
      ...options,
    })
  }

  toast(element, options)
}
