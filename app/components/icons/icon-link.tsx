// icon:link | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from 'react'

function IconLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M10 14a3.5 3.5 0 005 0l4-4a3.5 3.5 0 00-5-5l-.5.5" />
      <path d="M14 10a3.5 3.5 0 00-5 0l-4 4a3.5 3.5 0 005 5l.5-.5" />
    </svg>
  )
}

export default IconLink
