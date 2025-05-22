import { formatPercentage } from '../../web3/utils'

const templates = {
  'borrow-capacity-used': {
    75: '--custom-color-success',
    90: '--custom-color-warning',
    99: '--custom-color-alert',
    Infinity: '--custom-color-danger',
  },
}

interface Props {
  value: number
  template: keyof typeof templates
}

export function DifferentiatePercentWithColor({ value, template }: Props) {
  return <div style={{ color: getDifferentiateColorForTemplate(value, template) }}>{formatValue(value, template)}</div>
}

function formatValue(value: number, template: keyof typeof templates) {
  switch (template) {
    case 'borrow-capacity-used':
      return value > 100 ? `>${formatPercentage(100)}` : formatPercentage(value)
    default:
      return value
  }
}

function getColorKey(value: number, template: keyof typeof templates) {
  const values = Object.keys(templates[template])
  const index = values.findIndex(v => value < Number(v))
  return values[index]
}

export function getDifferentiateColorForTemplate(value: number, template: keyof typeof templates) {
  const colorKey = getColorKey(value, template)
  return `hsl(var(${templates[template][colorKey as keyof (typeof templates)[typeof template]]}))`
}
