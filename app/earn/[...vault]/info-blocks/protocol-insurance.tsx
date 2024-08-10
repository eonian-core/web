import { CommonInfoBlock } from './common-info-block'
import IconShieldHeart from '@/components/icons/icon-shield-heart'

export function ProtocolInsurance() {
  return (
    <CommonInfoBlock
      title="Protocol Insurance"
      items={[
        {
          title: 'Bitcoin Vault',
          value: 'Enabled',
          icon: <IconShieldHeart />,
        },
        {
          title: 'Asset Borrowers Protocols',
          value: 'Enabled',
          icon: <IconShieldHeart />,
        },
      ]}
      description={
        <>
          In case of a hack of the mentioned solutions, insured assets will be reimbursed.
        </>
      }
    />
  )
}
