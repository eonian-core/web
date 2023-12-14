import React from 'react'
import type { AccordionProps } from '@nextui-org/react'
import { Accordion as NextAccordion } from '@nextui-org/react'
import { useLocationHash } from './use-location-hash'

interface Props {
  expanded: string
  children: AccordionProps['children']
}

export default function Accordion({ expanded, children }: Props) {
  const [expandedItem, setExpandedItem] = React.useState(expanded)

  const hash = useLocationHash()

  React.useEffect(() => {
    if (typeof hash !== 'string') {
      return
    }
    const element = document.getElementById(hash)
    if (element) {
      setExpandedItem(hash)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return (
    <NextAccordion variant="splitted" selectionMode="single" selectedKeys={[expandedItem]}>
      {children}
    </NextAccordion>
  )
}

export function scrollIntoView(ref: React.RefObject<HTMLDivElement>) {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
