'use client'

import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

export enum FeatureFlags {
  LANDING_MAIN_CTA = 'landing-main-cta',
}

interface FeatureFlagsContextProps {
  flags: Record<string, string | boolean>
}

const FeatureFlagsContext = createContext<FeatureFlagsContextProps>({ flags: {} })

export interface FeatureFlagsProviderProps extends PropsWithChildren {
  flags: Record<string, string | boolean> | undefined
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children, flags = {} }) => {
  return (
    <FeatureFlagsContext.Provider value={{ flags }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags(): FeatureFlagsContextProps {
  return useContext(FeatureFlagsContext)
}
