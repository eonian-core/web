import { CommonInfoBlock } from './common-info-block'
import IconArrowRightShort from '@/components/icons/icon-arrow-right-short'

export function Fees() {
  return (
    <CommonInfoBlock
      title="Fees"
      items={[
        {
          title: 'Saving Fee',
          value: '0%',
          icon: <IconArrowRightShort style={{ transform: 'rotate(35deg)' }} />,
        },
        {
          title: 'Take Out Fee',
          value: '0%',
          icon: <IconArrowRightShort style={{ transform: 'rotate(-140deg)' }} />,
        },
      ]}
    />
  )
}
