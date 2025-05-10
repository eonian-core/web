interface Props {
  value: string
  subValue?: string
}

export function DefaultCell(props: Props) {
  return (
    <div className="flex flex-col items-center">
      <Content {...props} />
      <SubContent {...props} />
    </div>
  )
}

function Content({ value }: Props) {
  if (+value === 0)
    return <span className="text-sm text-foreground-600">0</span>

  return <span className="text-sm text-foreground-50">{value}</span>
}

function SubContent({ value, subValue }: Props) {
  if (!subValue)
    return null

  if (+value === 0)
    return null

  return <span className="text-xs text-foreground-600">{subValue}</span>
}
