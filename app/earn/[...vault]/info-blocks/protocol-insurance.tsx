import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconShieldHeart from '@/components/icons/icon-shield-heart'

export function ProtocolInsurance() {
  return (
    <CommonInfoBlock>
    <InfoBlockTitle>Protocol Insurance</InfoBlockTitle>

    <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconShieldHeart /></InfoItemIcon>
          <InfoItemTitle>Savings Account Vault</InfoItemTitle>
          <InfoItemValue>Enabled</InfoItemValue>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon><IconShieldHeart /></InfoItemIcon>
          <InfoItemTitle>Asset Borrowers Protocols</InfoItemTitle>
          <InfoItemValue>Enabled</InfoItemValue>
        </InfoItem>
      </InfoBlockList>

      <InfoBlockDescription>In case of a hack of the mentioned solutions, insured assets will be reimbursed.</InfoBlockDescription>

    </CommonInfoBlock>
  )
}
