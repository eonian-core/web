'use client'

// Global styles, still requre import styles for specific components
import '@mantine/core/styles/global.css'

// Used instead of full stlyes build
// import '@mantine/core/styles.css';

import React from 'react'
import { HeroUIProvider } from '@heroui/react'
import { MantineProvider } from '@mantine/core'

interface Props {
  children: React.ReactNode
}

function NextThemeProvider({ children }: Props) {
  return (
    <HeroUIProvider>
      <MantineProvider forceColorScheme="dark">
        {children}
      </MantineProvider>
    </HeroUIProvider>
  )
}

export default NextThemeProvider
