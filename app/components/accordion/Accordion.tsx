import React from 'react'
import type { AccordionProps, Selection } from '@nextui-org/react'
import { AccordionItem, Accordion as NextAccordion } from '@nextui-org/react'
import { toId } from '../heading/to-id'
import { useLocationHash } from './use-location-hash'

interface Props {
  expanded: string
  children: AccordionProps['children']
}

const TITLE_PROP = 'data-title'

export default function Accordion({ expanded, children }: Props) {
  const hash = useLocationHash()

  const [scrollTo, setScrollTo] = React.useState<string | null>(null)
  const [expandedKeys, setExpandedKeys] = React.useState<Selection>(new Set([expanded]))

  /**
   * NextUI's "Accordion" component requires only "AccordionItem" to be in its "children" prop, so we cannot create a custom wrapper on it and use in MDX.
   * The only way is to preprocess some custom element to convert it to the allowed "AccordionItem".
   */
  const accordionItems = React.useMemo(() => {
    const items = React.Children.toArray(children) as React.ReactElement<React.PropsWithChildren<{ [TITLE_PROP]: string }>>[]
    const toRenderItems = items.filter(item => TITLE_PROP in item.props)
    return toRenderItems.map((item) => {
      const title = item.props[TITLE_PROP]
      const id = toId(title)
      return <AccordionItem key={id} id={id} aria-label={title} title={title}>{item.props.children}</AccordionItem>
    })
  }, [children])

  /**
   * Scrolls to the accordion item if its ID is specified in url's hash.
   */
  React.useEffect(() => {
    if (typeof hash !== 'string')
      return

    const element = document.getElementById(hash)
    if (element) {
      setScrollTo(hash)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  /**
   * Opens accordion item (specified via url's "#hash") after scroll ends.
   */
  React.useEffect(() => {
    if (!scrollTo)
      return

    let scrollTimeout: number | undefined

    const handler = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        setScrollTo(null)
        setExpandedKeys((keys) => {
          if (typeof keys !== 'string')
            keys.add(scrollTo)

          return new Set(keys)
        })
      }, 100)
    }
    addEventListener('scroll', handler)

    return () => {
      removeEventListener('scroll', handler)
    }
  }, [scrollTo])

  return (
    <NextAccordion
      variant="splitted"
      selectionMode="multiple"
      selectedKeys={expandedKeys}
      onSelectionChange={setExpandedKeys}
    >
      {accordionItems}
    </NextAccordion>
  )
}
