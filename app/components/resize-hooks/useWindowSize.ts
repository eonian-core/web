'use client'

import { useLayoutEffect, useState } from 'react'

/** Define general type for useWindowSize hook, which includes width and height */
export interface Size {
  width: number | undefined
  height: number | undefined
}

/**
 * This hook returns an object containing the window's width and height compute-optimised way.
 * If executed server-side (no window object) the value of width and height will be undefined.
 *
 * @example
 * function App() {
 *  const size: Size = useWindowSize();
 *  return (
 *      <div>
 *          {size.width}px / {size.height}px
 *      </div>
 *  );
 * }
 */
export function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>(getDefaultSize())

  useLayoutEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.screen.width,
        height: window.screen.height,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)

    // Empty array ensures that effect is only run on mount
  }, [])

  return windowSize
}

function getDefaultSize(): Size {
  try {
    return { width: window.screen.width, height: window.screen.height }
  }
  catch (e) {
    if (e instanceof ReferenceError)
      return { width: undefined, height: undefined }

    throw e
  }
}
