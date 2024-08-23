import { CommonInfoBlock, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'

export function Fees() {
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Fees</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconArrowRightShort style={{ transform: 'rotate(35deg)' }} /></InfoItemIcon>
          <InfoItemTitle>Saving Fee</InfoItemTitle>
          <InfoItemValue>0%</InfoItemValue>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon><IconArrowRightShort style={{ transform: 'rotate(-140deg)' }} /></InfoItemIcon>
          <InfoItemTitle>Take Out Fee</InfoItemTitle>
          <InfoItemValue>0%</InfoItemValue>
        </InfoItem>
      </InfoBlockList>
    </CommonInfoBlock>
  )
}
