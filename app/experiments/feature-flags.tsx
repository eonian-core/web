'use client'

import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { toStringMap } from './string-map'
import { analytics } from '@/analytics/analytics'

export enum FeatureFlags {
  LANDING_MAIN_CTA = 'landing-main-cta',
  LANDING_HERO_COPY_V1_1 = 'landing-hero-copy-v1_1',
  LANDING_HERO_COPY_V1_2 = 'landing-hero-copy-v1_2',
}

export type FlagValue = string | boolean

interface FeatureFlagsContextProps {
  flags: Record<string, FlagValue>
}

const FeatureFlagsContext = createContext<FeatureFlagsContextProps>({ flags: {} })

export interface FeatureFlagsProviderProps extends PropsWithChildren {
  flags: Record<string, FlagValue> | undefined
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children, flags = {} }) => {
  analytics.tag(toStringMap(flags))

  return (
    <FeatureFlagsContext.Provider value={{ flags }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags(): FeatureFlagsContextProps {
  return useContext(FeatureFlagsContext)
}

export function useFlag(flag: FeatureFlags): FlagValue | undefined {
  const { flags } = useFeatureFlags()
  return flags[flag]
}

export function useIsTestForFlag(flag: FeatureFlags): boolean {
  const featureFlag = useFlag(flag)
  return featureFlag === 'test'
}
