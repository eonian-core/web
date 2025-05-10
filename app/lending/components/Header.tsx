import { Button } from '@heroui/react'
import { useLendingState } from '../LendingState'
import { getChainIcon } from '@/providers/wallet/wrappers/helpers'

export function Header() {
  const { chainId, chainName } = useLendingState()
  return (
    <div className="flex flex-col justify-start items-start mb-12 gap-6 mobile:flex-row mobile:justify-between mobile:items-center">
      <div>
        <h1 className="text-3xl font-medium text-foreground-50">Supply to Borrow</h1>
        <p className="text-foreground-300 mt-1">Supply collateral to earn yield and borrow against it</p>
      </div>
      <Button variant="solid" size="md">
        <div className="flex items-center gap-2">
          {getChainIcon(chainId, 16)}
          {chainName}
        </div>
      </Button>
    </div>
  )
}
