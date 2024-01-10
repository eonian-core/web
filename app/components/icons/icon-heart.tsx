// icon:heart | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from 'react'

function IconHeart(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19.5 12.572L12 20l-7.5-7.428m0 0A5 5 0 1112 6.006a5 5 0 117.5 6.572" />
    </svg>
  )
}

export default IconHeart
