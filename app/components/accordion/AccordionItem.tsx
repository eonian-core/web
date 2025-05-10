import React from 'react'
import { AccordionItem as NextAccordionItem } from '@heroui/react'
import { useToId } from '../heading/to-id'

interface Props {
  title: string
  children: React.ReactNode
}

export default function AccordionItem({ title, children }: Props) {
  const id = useToId(title)
  return (
    <NextAccordionItem key={id} id={id} aria-label={title} title={title}>
      {children}
    </NextAccordionItem>
  )
}
