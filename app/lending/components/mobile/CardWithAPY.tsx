import { Card, CardBody } from '@heroui/react'

interface Props {
  apy: string
  title: string
}

export function CardWithAPY({ apy, title }: Props) {
  return (
    <Card className="flex-1">
      <CardBody>
        <div className="text-sm text-foreground-500">{title}</div>
        <div className="text-lg text-foreground-50">{apy}</div>
      </CardBody>
    </Card>
  )
}
