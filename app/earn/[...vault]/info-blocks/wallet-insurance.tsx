import { Suspense, useState } from 'react'
import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconEmail from '@/components/icons/icon-email'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function WalletInsurance() {
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Wallet Insurance</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconEmail /></InfoItemIcon>
          <InfoItemTitle>Recovery Email</InfoItemTitle>
          <InfoItemValue>
            <Suspense fallback={<OneLineSkeleton
              marginTop={5}
              marginBottom={10}
              width={80}
            />}>
              <EmailStatus />
            </Suspense>
          </InfoItemValue>
        </InfoItem>
      </InfoBlockList>

      <InfoBlockDescription>In case of a wallet hack, insured assets will be recoverable through email.</InfoBlockDescription>
    </CommonInfoBlock>
  )
}

function EmailStatus() {
  return 'Not Linked'
}
