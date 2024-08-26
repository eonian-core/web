import { CommonInfoBlock, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconSandClock from '@/components/icons/icon-sand-clock'
import IconCurrencyDollar from '@/components/icons/icon-dollar'

export function WithdrawLimits() {
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Withdraw Limits</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconSandClock /></InfoItemIcon>
          <InfoItemTitle>Time lock</InfoItemTitle>
          <InfoItemValue>No Lock</InfoItemValue>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon><IconCurrencyDollar /></InfoItemIcon>
          <InfoItemTitle>Amount</InfoItemTitle>
          <InfoItemValue>Unlimited</InfoItemValue>
        </InfoItem>
      </InfoBlockList>
    </CommonInfoBlock>
  )
}
