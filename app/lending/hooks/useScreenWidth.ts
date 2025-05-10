import { useCallback, useEffect, useState } from 'react'

// Screen width types based on tailwind.config.js
export type ScreenWidthType = 'small' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'ultra'

// Breakpoints based on tailwind.config.js
const breakpoints: Record<ScreenWidthType, number> = {
  small: 430,
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  ultra: 1536,
}

/**
 * Hook that returns the current screen width type based on tailwind breakpoints
 */
export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(() => {
    return typeof window.innerWidth === 'number' ? window.innerWidth : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    screenLTE: useCallback((screenWidthType: ScreenWidthType) => screenWidth <= breakpoints[screenWidthType], [screenWidth]),
    screenGTE: useCallback((screenWidthType: ScreenWidthType) => screenWidth >= breakpoints[screenWidthType], [screenWidth]),
    screenWidth,
  }
}
