import { Tooltip } from '@nextui-org/react'
import { useWalletLinkPreview } from '../hooks/use-wallet-link-preview'
import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconEmail from '@/components/icons/icon-email'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import { RequestStatus } from '@/store/slices/requestSlice'
import type { EmailLinkPreview, SocialLinkPreview } from '@/api/wallet-linking/gql/graphql'

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
  const { status: walletStatus } = useWalletWrapperContext()
  const [link, status] = useWalletLinkPreview()
  if (walletStatus === WalletStatus.NOT_CONNECTED)
    return 'Not Linked'

  if ([RequestStatus.Pending, RequestStatus.Rejected].includes(status))
    return <EmailStatusSkeleton />

  if (!link)
    return 'Link email'

  return <Tooltip content={<>
    Linked to {(link as EmailLinkPreview).email
    ? <EmailWalletLink>{link as EmailLinkPreview}</EmailWalletLink>
    : <SocialWalletLink>{link as SocialLinkPreview}</SocialWalletLink>
    }
  </>}><span>Linked</span></Tooltip>
}

export function EmailStatusSkeleton() {
  return <OneLineSkeleton
    marginTop={5}
    marginBottom={10}
    width={80}
  />
}

export function EmailWalletLink({ children: link }: { children: EmailLinkPreview }) {
  return link.email
}

export function SocialWalletLink({ children: link }: { children: SocialLinkPreview }) {
  return <>{link.username} on {link.platform}</>
}
