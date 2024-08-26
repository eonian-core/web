// icon:coin | System UIcons https://systemuicons.com/ | Corey Ginnivan
import * as React from 'react'

function IconCoinAbstract(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 9.5c0-1.3 3.134-3 7-3s7 1.7 7 3v3c0 1.3-3.134 3-7 3s-7-1.7-7-3v-3z" />
        <path d="M10.5 12.484c3.866 0 7-1.606 7-2.986 0-1.381-3.134-2.998-7-2.998s-7 1.617-7 2.998c0 1.38 3.134 2.986 7 2.986z" />
      </g>
    </svg>
  )
}

export default IconCoinAbstract
