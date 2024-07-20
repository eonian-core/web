import { CommonInfoBlock } from './common-info-block'
import IconSandClock from '@/components/icons/icon-sand-clock'
import IconCurrencyDollar from '@/components/icons/icon-dollar'

export function WithdrawLimits() {
  return (
    <CommonInfoBlock
      title="Withdraw Limits"
      items={[
        {
          title: 'Time lock',
          value: 'No Lock',
          icon: <IconSandClock />,
        },
        {
          title: 'Amount',
          value: 'Unlimited',
          icon: <IconCurrencyDollar />,
        },
      ]}
    />
  )
}
