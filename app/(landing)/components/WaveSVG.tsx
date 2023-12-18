'use client'

import React from 'react'

export default function WaveSVG() {
  const pathRef = React.useRef<SVGPathElement | null>(null)

  React.useEffect(() => {
    const { current: path } = pathRef
    if (!path) {
      return
    }
    let loadingAnimation: number

    const spinLoad = (time: number) => {
      const speed = 0.25
      path.style.strokeDashoffset = String(time * speed)
      loadingAnimation = requestAnimationFrame(spinLoad)
    }

    loadingAnimation = requestAnimationFrame(spinLoad)

    return () => {
      cancelAnimationFrame(loadingAnimation)
    }
  }, [])

  return (
    <svg
      className="absolute h-full w-full top-0 right-0 text-background-700"
      preserveAspectRatio="none"
      viewBox="0 0 500 150"
      height="100%"
      width="50%"
      fill="currentColor"
    >
      <path ref={pathRef} strokeDasharray="100 1500" strokeDashoffset="0" strokeWidth={0.5} stroke="#9d2e4c" d="M736.57,-28.05 C57.11,33.95 402.48,90.05 -40.51,153.04 L500.00,149.60 L510.00,-0.00 Z"></path>
    </svg>
  )
}
