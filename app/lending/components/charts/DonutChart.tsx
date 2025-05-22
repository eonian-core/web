import { cn } from '@heroui/react'

interface Props extends React.SVGProps<SVGSVGElement> {
  rate: number // 0-1 value representing percentage
  color?: string
}

export function DonutChart({ rate, color, ...props }: Props) {
  const clampedRate = Math.max(0, Math.min(1, rate))
  const radius = 15
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - clampedRate)
  return (
    <svg viewBox="0 0 50 50" {...props}>
      {/* Background circle */}
      <circle cx="25" cy="25" r={radius} fill="transparent" className="stroke-slate-200 opacity-25" strokeWidth="5" />
      {/* Foreground circle that shows the progress */}
      <circle
        cx="25"
        cy="25"
        r={radius}
        fill="transparent"
        className={cn('bg-primary-400 transition-all duration-300 ease-in-out', color ? '' : 'stroke-[var(--color-primary-500)]')}
        style={{ stroke: color }}
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90, 25, 25)"
      />
    </svg>
  )
}
