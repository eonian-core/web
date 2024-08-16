import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconEmail from '@/components/icons/icon-email'

export function WalletInsurance() {
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Wallet Insurance</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconEmail /></InfoItemIcon>
          <InfoItemTitle>Recovery Email</InfoItemTitle>
          <InfoItemValue>Not Linked</InfoItemValue>
        </InfoItem>
      </InfoBlockList>

      <InfoBlockDescription>In case of a wallet hack, insured assets will be recoverable through email.</InfoBlockDescription>
    </CommonInfoBlock>
  )
}
