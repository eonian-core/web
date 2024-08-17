import { Tooltip } from '@nextui-org/react'
import { Suspense } from 'react'
import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconEmail from '@/components/icons/icon-email'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import type { EmailLinkPreview, SocialLinkPreview } from '@/api/wallet-linking/gql/graphql'
import { isEmailLinked, useCurrentWalletLinkPreview } from '@/api/wallet-linking/wallet/use-wallet-link'

export function WalletInsurance() {
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Wallet Insurance</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconEmail /></InfoItemIcon>
          <InfoItemTitle>Recovery Email</InfoItemTitle>
          <InfoItemValue>
            <EmailStatus />
          </InfoItemValue>
        </InfoItem>
      </InfoBlockList>

      <InfoBlockDescription>In case of a wallet hack, insured assets will be recoverable through email.</InfoBlockDescription>
    </CommonInfoBlock>
  )
}

function EmailStatus() {
  const { wallet, chain, status } = useWalletWrapperContext()

  if (status === WalletStatus.CONNECTING)
    return <EmailStatusSkeleton />

  if (status === WalletStatus.NOT_CONNECTED || !wallet?.address || !chain?.id)
    return 'Not Linked'

  return (<Suspense fallback={<EmailStatusSkeleton />}>
    <EmailStatusContent address={wallet.address} chainId={chain?.id} status={status} />
  </Suspense>)
}

export interface EmailStatusContentProps {
  address: string
  chainId: number
  status: WalletStatus
}

function EmailStatusContent({ address, chainId, status }: EmailStatusContentProps) {
  const { loading, error, data } = useCurrentWalletLinkPreview(address, chainId, status)
  if (error || loading)
    return <EmailStatusSkeleton />

  const link = data?.getWalletPreview?.link
  if (!link)
    return 'Link email'

  return (
    <Tooltip content={
      <>
        Linked to {isEmailLinked(link)
        ? <EmailWalletLinked>{link}</EmailWalletLinked>
        : <SocialWalletLinked>{link}</SocialWalletLinked>
        }
      </>
    }>
      <span>Linked</span>
    </Tooltip>
  )
}

export function EmailStatusSkeleton() {
  return <OneLineSkeleton
    marginTop={5}
    marginBottom={10}
    width={80}
  />
}

export function EmailWalletLinked({ children: link }: { children: EmailLinkPreview }) {
  return link.email
}

export function SocialWalletLinked({ children: link }: { children: SocialLinkPreview }) {
  return <>{link.username} on {link.platform}</>
}
