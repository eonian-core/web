import { useLendingState } from '../../LendingState'
import { MobileMarketCard } from './MobileMarketCard'

interface Props {
  onWithdraw: (rowIndex: number) => void
  onRepay: (rowIndex: number) => void
  onBorrow: (rowIndex: number) => void
  onSupply: (rowIndex: number) => void
}

export function MobileMarketList({ onWithdraw, onRepay, onBorrow, onSupply }: Props) {
  const { markets } = useLendingState()

  return (
    <div className="flex flex-col gap-4">
      {markets.map((market, index) => (
        <MobileMarketCard
          key={market.address}
          market={market}
          onWithdraw={() => onWithdraw(index)}
          onRepay={() => onRepay(index)}
          onBorrow={() => onBorrow(index)}
          onSupply={() => onSupply(index)}
        />
      ))}
    </div>
  )
}
