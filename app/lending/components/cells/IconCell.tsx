interface Props {
  icon: React.ReactNode
  symbol: string
}

export function IconCell({ icon, symbol }: Props) {
  return (
    <td className="p-3">
      <div className="flex items-center gap-2 flex-col mobile:flex-row">
        <div className="w-8 h-8 rounded-full flex-shrink-0">{icon}</div>
        <span className="text-sm font-semibold text-foreground-50">{symbol}</span>
      </div>
    </td>
  )
}
