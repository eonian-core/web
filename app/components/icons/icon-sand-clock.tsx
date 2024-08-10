import * as React from 'react'

function IconSandClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6m10 14.5V20H8v-3.5l4-4 4 4m-4-5l-4-4V4h8v3.5l-4 4z" />
    </svg>
  )
}

export default IconSandClock
