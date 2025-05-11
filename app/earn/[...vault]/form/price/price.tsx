import { ethers } from 'ethers'
import CompactNumber from '@/components/compact-number/compact-number'
import { getAmountInUSD } from '@/finances/humanize'
import { formatUSD } from '@/finances/humanize/format-currency'
import type { Vault } from '@/types'

interface PriceProps {
  vault: Vault
  children: string | ReadonlyArray<string> | number | undefined
}

export function Price({ children: value, vault }: PriceProps) {
  const stringValue = String(value || 0)
  const amount = ethers.parseUnits(stringValue, vault.asset.decimals)
  const [amountInUSD, decimals] = getAmountInUSD(amount, vault)

  const stringValueUSD = ethers.formatUnits(amountInUSD, decimals)
  const valueUSD = +stringValueUSD
  const useApprox = valueUSD > 0
  if (valueUSD <= Number.MAX_SAFE_INTEGER)
    return <>{useApprox ? '≈ ' : ''}{formatUSD(valueUSD)}</>

  return (
        <CompactNumber value={amountInUSD} decimals={decimals} fractionDigits={2} hideTooltip childrenAtStart>
            <>≈ $</>
        </CompactNumber>
  )
}
