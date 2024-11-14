'use client'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { type PropsWithChildren, useCallback } from 'react'
import type { AbstarctTrackEvent } from './analytics'
import { analytics } from './analytics'

export const isVaultPageReg = /\/earn\/\w+\/\w+/

function mapPathnameToRoute(pathname: string) {
  if (isVaultPageReg.test(pathname))
    return '/earn/[...vault]'

  return pathname
}

export function useTrack() {
  const pathname = usePathname()

  return useCallback((name: React.ReactNode) => {
    return trackNodeEvent({
      pathname,
      context: mapPathnameToRoute(pathname),
      name,
    })
  }, [pathname])
}

export interface TrackEvent extends AbstarctTrackEvent {
  name: React.ReactNode
}

export function trackNodeEvent({ context, pathname, name }: TrackEvent) {
  try {
    const nodeText = getNodeText(name)
    analytics.track(nodeText, { context, pathname })
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
    case 'boolean':
      return `${node}`

    case 'object': {
      if (Array.isArray(node))
        return node.map(getNodeText).join(' ')

      if ('props' in node)
        return getNodeText((node.props as PropsWithChildren).children as React.ReactNode)
    } // eslint-ignore-line no-fallthrough

    default:
      return JSON.stringify(node)
  }
}
