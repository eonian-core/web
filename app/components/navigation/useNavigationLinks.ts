import React from 'react'
import { ResourcesLinks } from '../../features'

const links = [
  ResourcesLinks.Mission,
  ResourcesLinks.Roadmap,
  ResourcesLinks.Community,
  ResourcesLinks.Security,
  ResourcesLinks.Earn,
  ResourcesLinks.Docs,
]

export default function useNavigationLinks() {
  return React.useMemo(() => {
    return links.filter(({ isEnabled }) => isEnabled)
  }, [])
}
