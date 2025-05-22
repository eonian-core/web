interface Props {
  /**
   * The utilization rate as a decimal (0-1)
   */
  rate: number
}

export function UtilizationRateLine({ rate }: Props) {
  const safeRate = Math.max(0, Math.min(1, rate))
  const displayPercentage = Math.round(safeRate * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-foreground-500">Utilization Rate</div>
        <div className="text-md font-medium text-foreground-50">{displayPercentage}%</div>
      </div>
      <div className="relative h-1 w-full bg-foreground-800 rounded-full">
        {/* Filled portion */}
        <div className="absolute left-0 top-0 h-1 bg-primary-400 rounded-full" style={{ width: `${displayPercentage}%` }} />
        {/* Marker for current position */}
        <div
          className="absolute top-0 h-3 w-3 bg-white"
          style={{
            left: `calc(${displayPercentage}% - 0px)`,
            width: '2px',
            height: '8px',
            transform: 'translateY(-2px)',
          }}
        />
      </div>
    </div>
  )
}
