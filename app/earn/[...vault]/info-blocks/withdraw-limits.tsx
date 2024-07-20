import { CommonInfoBlock } from './common-info-block'
import IconSandClock from '@/components/icons/icon-sand-clock'
import IconInfinity from '@/components/icons/icon-infinity'

export function WithdrawLimits() {
  return (
    <CommonInfoBlock
      title="Fees"
      items={[
        {
          title: 'Time lock',
          value: 'No Lock',
          icon: <IconSandClock />,
        },
        {
          title: 'Amount',
          value: 'Unlimited',
          icon: <IconInfinity />,
        },
      ]}
    />
  )
}
