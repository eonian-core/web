'use client'

import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

export enum FeatureFlags {
  LANDING_MAIN_CTA = 'landing-main-cta',
  LANDING_HERO_COPY_V1_1 = 'landing-hero-copy-v1_1',
  LANDING_HERO_COPY_V1_2 = 'landing-hero-copy-v1_2',
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

export function useFlag(flag: FeatureFlags): string | boolean | undefined {
  const { flags } = useFeatureFlags()
  return flags[flag]
}

export function useIsTestForFlag(flag: FeatureFlags): boolean {
  const featureFlag = useFlag(flag)
  return featureFlag === 'test'
}
