'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

interface Props {
  children: React.ReactNode
}

function NextThemeProvider({ children }: Props) {
  return (
    <NextUIProvider>{children}</NextUIProvider>
  )
}

export default NextThemeProvider
