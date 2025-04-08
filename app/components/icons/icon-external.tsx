import * as React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: string | number
}

const IconExternal: React.FC<Props> = ({ size = 16, ...restProps }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" height={size} width={size} data-testid="icon-external" {...restProps}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
  </svg>
)

export default IconExternal
