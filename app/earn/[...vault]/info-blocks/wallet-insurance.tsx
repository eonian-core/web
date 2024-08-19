import { Tooltip } from '@nextui-org/react'
import { CommonInfoBlock, InfoBlockDescription, InfoBlockList, InfoBlockTitle, InfoItem, InfoItemIcon, InfoItemTitle, InfoItemValue } from './common-info-block'
import IconEmail from '@/components/icons/icon-email'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'
import { useWalletWrapperContext } from '@/providers/wallet/wallet-wrapper-provider'
import { WalletStatus } from '@/providers/wallet/wrappers/types'
import type { EmailLinkPreview, LinkPreview, SocialLinkPreview } from '@/api/wallet-linking/gql/graphql'
import { isEmailLinked, useSuspenseCurrentWalletLinkPreview } from '@/api/wallet-linking/wallet/use-wallet-link'

import Button from '@/components/button/button'
import { useWalletLinkingContext } from '@/views/wallet-linking-drawer/wallet-linking-drawer'
import { LinkInText } from '@/components/links/link-in-text'
import { SuspenseWithErrorBoundary } from '@/components/suspense/suspense-with-error-boundary'

const NotLinkedDescription = () => <>In case of a wallet hack, insured assets will be recoverable through email.</>

export function WalletInsurance() {
  const { wallet, chain, status } = useWalletWrapperContext()

  if (status === WalletStatus.CONNECTING) {
    return (
      <WalletInsuranceBase status={<EmailStatusSkeleton />}><NotLinkedDescription /></WalletInsuranceBase>
    )
  }

  if (status === WalletStatus.NOT_CONNECTED || !wallet?.address || !chain?.id) {
    return (
      <WalletInsuranceBase status={'Not linked'}><NotLinkedDescription /></WalletInsuranceBase>
    )
  }

  return (
    <SuspenseWithErrorBoundary fallback={
      <WalletInsuranceBase status={<EmailStatusSkeleton />}>
        <NotLinkedDescription />
      </WalletInsuranceBase>
    }>
      <LinkedWalletInsurance
        address={wallet.address}
        chainId={chain?.id}
        status={status}
      />
    </SuspenseWithErrorBoundary>
  )
}

export interface LinkedWalletInsuranceProps {
  address: string
  chainId: number
  status: WalletStatus
}

function LinkedWalletInsurance({ address, chainId, status }: LinkedWalletInsuranceProps) {
  const { open } = useWalletLinkingContext()
  const { data } = useSuspenseCurrentWalletLinkPreview(address, chainId, status)
  const link = data?.getWalletPreview?.link
  if (!link) {
    return (
      <WalletInsuranceBase status={<Button gradient round size="sm" onClick={open}>Link email</Button>}>
        <NotLinkedDescription />
      </WalletInsuranceBase>
    )
  }

  return (
    <WalletInsuranceBase status={<EmailStatusContent>{link}</EmailStatusContent>}>
      In case of wallet hack follow <LinkInText href={'https://docs.eonian.finance/basics/guides/recovering-assets-after-a-wallet-hack'}>this instructions</LinkInText> to recover your assets.
    </WalletInsuranceBase>
  )
}

export interface WalletInsuranceBaseProps {
  children: React.ReactNode
  status: React.ReactNode
}

function WalletInsuranceBase({ children: description, status }: WalletInsuranceBaseProps) {
  return (
    <CommonInfoBlock>
      <InfoBlockTitle>Wallet Insurance</InfoBlockTitle>

      <InfoBlockList>
        <InfoItem>
          <InfoItemIcon><IconEmail /></InfoItemIcon>
          <InfoItemTitle>Recovery Email</InfoItemTitle>
          <InfoItemValue>{status}</InfoItemValue>
        </InfoItem>
      </InfoBlockList>

    <InfoBlockDescription>{description}</InfoBlockDescription>
  </CommonInfoBlock>
  )
}

function EmailStatusContent({ children: link }: { children: LinkPreview }) {
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
