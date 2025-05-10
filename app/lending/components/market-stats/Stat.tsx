import { cn } from '@heroui/react'

interface StatProps {
  label: string
  value: React.ReactNode
  center?: boolean
  valueClasses?: string
  labelClasses?: string
}

export function Stat({ label, value, center = true, valueClasses, labelClasses }: StatProps) {
  return (
    <div className={cn('flex flex-col', center && 'items-center')}>
      <div className={cn('text-xs text-foreground-300', labelClasses)}>{label}</div>
      <div className={cn('text-lg font-bold text-foreground-50', valueClasses)}>{value}</div>
    </div>
  )
}
