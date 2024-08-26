'use client'

// Global styles, still requre import styles for specific components
import '@mantine/core/styles/global.css'

// Used instead of full stlyes build
// import '@mantine/core/styles.css';

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { MantineProvider } from '@mantine/core'

interface Props {
  children: React.ReactNode
}

function NextThemeProvider({ children }: Props) {
  return (
    <NextUIProvider>
      <MantineProvider forceColorScheme="dark">
        {children}
      </MantineProvider>
    </NextUIProvider>
  )
}

export default NextThemeProvider
