import * as React from 'react'

function IconDotsVertical(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" height="1.25em" width="1.25em" {...props}>
      <circle cx="12" cy="4" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="20" r="2" />
    </svg>
  )
}

export default IconDotsVertical
