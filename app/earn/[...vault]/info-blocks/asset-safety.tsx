import { CommonInfoBlock } from './common-info-block'

export function AssetSafety() {
  const amount = 300
  return (
    <CommonInfoBlock
      title="Asset Safety"
      items={[]}
      description={'After deposit of 300 BTC, the whole portfolio will be covered by insurance.'}
    />
  )
}
