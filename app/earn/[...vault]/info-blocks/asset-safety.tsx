import type { PropsWithChildren } from 'react'
import { useVaultDeposit } from '../hooks/use-vault-deposit-change'
import { useVaultContext } from '../hooks/use-vault-context'
import { useVaultAssetProportion } from '../portfolio/portfolio'
import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import CompactNumber from '@/components/compact-number/compact-number'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'
import { getAssetSymbol } from '@/api/protocol/vaults/get-asset-symbol'
import type { TokenSymbol } from '@/types'
import { FormAction } from '@/store/slices/types'

export function AssetSafety() {
  const { inputValue = 0n, showPlaceholder, placeholderValue, vault } = useVaultContext()
  const value = showPlaceholder ? placeholderValue : inputValue
  const proportion = useVaultAssetProportion()

  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Asset Safety</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconArrowRightShort /></InfoItemIcon>
          <InfoItemTitle>Portfolio Rating</InfoItemTitle>
          <InfoItemValue>
            <PortfolioRating>{proportion}</PortfolioRating>
          </InfoItemValue>
        </InfoItem>
      </InfoBlockList>

      <SafetyDescription proportion={proportion} amount={value}>
        <CompactNumber value={value} decimals={vault.asset.decimals} fractionDigits={2} hideTooltip>
          &nbsp;{getAssetSymbol(vault)}
        </CompactNumber>
      </SafetyDescription>

    </CommonInfoBlock>
  )
}

function PortfolioRating({ children: proportion }: { children: number }) {
  if (proportion === 1)
    return 'Fully Protected'

  if (proportion > 0)
    return 'Partially Protected'

  return 'Not Protected'
}

function SafetyDescription({ children: displayAmount, proportion, amount }: PropsWithChildren<{ proportion: number; amount: bigint }>) {
  const { formAction } = useVaultContext()

  if (amount === 0n) {
    return (
      <InfoBlockDescription>
        {proportion === 0
          ? 'Whole your portfolio on the wallet, that not covered by insurance, but only assets in savings account can be recovered.'
          : proportion === 1
            ? 'Whole your portfolio in savings account is covered by insurance.'
            : 'Only part of portfolio in savings account is covered by insurance.'
        }
      </InfoBlockDescription>
    )
  }

  if (formAction === FormAction.DEPOSIT) {
    return (
      <InfoBlockDescription>
        After deposit of {displayAmount}, {proportion === 1
        ? 'the whole portfolio will be covered by insurance.'
        : 'the only part of portfolio in savings account will be covered by insurance.'
        }
      </InfoBlockDescription>
    )
  }

  return (
    <InfoBlockDescription>
      After withdaw of {displayAmount}, { proportion === 0
      ? 'whole your portfolio will be on the wallet, that not covered by insurance.'
      : 'the only part of portfolio in savings account will be covered by insurance.'
      }
    </InfoBlockDescription>
  )
}
