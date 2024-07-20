import { CommonInfoBlock } from './common-info-block'
import IconEmail from '@/components/icons/icon-email'

export function WalletInsurance() {
  return (
    <CommonInfoBlock
      title="Wallet Insurance"
      items={[
        {
          title: 'Recovery Email',
          value: 'Not Linked',
          icon: <IconEmail />,
        },
      ]}
      description={<>In case of a wallet hack, insured assets will be recoverable through email.</>}
    />
  )
}
