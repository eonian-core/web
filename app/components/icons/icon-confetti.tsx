import * as React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string | number
  height?: string | number
}

function IconConfetti({ width = 16, height = 16, ...restProps }: Props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={width}
      width={height}
      {...restProps}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M4 5h2M5 4v2M11.5 4L11 6M18 5h2M19 4v2M15 9l-1 1M18 13l2-.5M18 19h2M19 18v2M14 16.518L7.482 10l-4.39 9.58a1.003 1.003 0 001.329 1.329L14 16.519z" />
    </svg>
  )
}

export default IconConfetti
