import type React from 'react'
import type { PropsWithChildren } from 'react'

declare global {
  interface Window {
    clarity: (type: string, name: string) => void
  }
}

export function track(name: React.ReactNode) {
  if (
    typeof window === 'undefined'
        || !window.clarity
        || typeof window.clarity !== 'function'
  ) {
    console.warn('Clarity is not loaded to publish event', name)
    return
  }

  try {
    const eventName = getNodeText(name)
    window.clarity('event', eventName)
  }
  catch (error) {
    console.error('Failed to push event to Clarity', name, error)
  }
}

function getNodeText(node: React.ReactNode): string {
  if (node == null)
    return ''

  switch (typeof node) {
    case 'string':
    case 'number':
      return node.toString()

    case 'boolean':
      return node ? 'true' : 'false'

    case 'object': {
      if (Array.isArray(node))
        return node.map(getNodeText).join('')

      if ('props' in node)
        return getNodeText((node.props as PropsWithChildren).children as React.ReactNode)
    } // eslint-ignore-line no-fallthrough

    default:
      return JSON.stringify(node)
  }
}
