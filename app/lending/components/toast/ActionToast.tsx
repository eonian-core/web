import { Spinner } from '@heroui/react'
import Image from 'next/image'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import type { Wallet } from '@/providers/wallet/wrappers/types'

interface Props {
  title: string
  description?: string
  isLoading?: boolean
}

export function ActionToast({ title, description, isLoading }: Props) {
  const { wallet } = useWalletWrapperContext()

  return (
    <div className="flex items-center gap-4">
      {isLoading ? <Spinner size="md" /> : <ToastImage wallet={wallet} size={32} />}
      <div>
        <h4 className="text-md font-medium">{title}</h4>
        {description && <p className="text-sm text-foreground-400">{description}</p>}
      </div>
    </div>
  )
}

function ToastImage({ wallet, size }: { wallet: Wallet | null; size: number }) {
  if (wallet === null)
    return null

  return <Image src={wallet.iconImageSrc} alt={wallet.label} width={size} height={size} />
}
