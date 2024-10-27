import * as React from 'react'

export interface CustomComponentProps {
  children?: React.ReactNode
  className?: string
  verbose?: boolean
}

export function CustomComponent({ children, className, verbose }: CustomComponentProps) {
  return (
    <div className={className} style={{ padding: '20px' }}>
      <p>Hello there! {verbose && 'Really nice to meet you!'}</p>
      <div>{children}</div>
    </div>
  )
}
