'use client'

import { useEffect, useState } from 'react'
import { DESKTOP_SCREEN, LAPTOP_SCREEN, MOBILE_SCREEN, TABLET_SCREEN, ULTRA_WIDE_SCREEN, useIsScreenSmallerOrEqual } from './screens'

/** Hook will be triggered only after first render, allow avoid hidration issues */
export function useOnClientSize(size: number): boolean | undefined {
  const isSmallerOrEqual = useIsScreenSmallerOrEqual(size)
  const [endSize, setEndSize] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setEndSize(isSmallerOrEqual)
  }, [isSmallerOrEqual])

  return endSize
}

/** Return true if current screen is smaller or equal mobile screen size */
export const useIsMobileOrSmallerOnClient = (): boolean | undefined => useOnClientSize(MOBILE_SCREEN)

/** Return true if current screen is smaller or equal tablet screen size */
export const useIsTabletOrSmallerOnClient = (): boolean | undefined => useOnClientSize(TABLET_SCREEN)

/** Return true if current screen is smaller or equal laptop screen size */
export const useIsLaptopOrSmallerOnClient = (): boolean | undefined => useOnClientSize(LAPTOP_SCREEN)

/** Return true if current screen is smaller or equal desktop screen size */
export const useIsDesktopOrSmallerOnClient = (): boolean | undefined => useOnClientSize(DESKTOP_SCREEN)

/** Return true if current screen is smaller or equal ultra wide screen size */
export const useIsUltraWideOrSmallerOnClient = (): boolean | undefined => useOnClientSize(ULTRA_WIDE_SCREEN)
