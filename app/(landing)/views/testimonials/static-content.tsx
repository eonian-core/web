import { createElement, useEffect, useRef, useState } from 'react'

function useStaticContent() {
  const ref = useRef<HTMLElement>(null)
  const [render, setRender] = useState(typeof window === 'undefined')

  useEffect(() => {
    // check if the innerHTML is empty as client side navigation
    // need to render the component without server-side backup
    const isEmpty = ref.current?.innerHTML === ''
    if (isEmpty)
      setRender(true)
  }, [])

  return [render, ref]
}

interface StaticContentProps extends React.HTMLProps<HTMLElement> {
  element?: string
}

export default function StaticContent({ children, element = 'div', ...props }: React.PropsWithChildren<StaticContentProps>) {
  const [render, ref] = useStaticContent()

  // if we're in the server or a spa navigation, just render it
  if (render) {
    // eslint-disable-next-line react/no-children-prop
    return createElement(element, {
      ...props,
      children,
    })
  }

  // avoid re-render on the client
  return createElement(element, {
    ...props,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: '' },
  })
}
