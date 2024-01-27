import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'
import React from 'react'

const width = 'width'
const height = 'height'

type Dimension = typeof height | typeof width

export default function useDimensionTransform<T>(ref: React.RefObject<T>, value: MotionValue<number>, input: number[], output: (number | Dimension)[]): MotionValue<number> {
  const [size, setSize] = React.useState<number | null>(null)

  const dimensionType = React.useMemo(() => {
    return output.find(value => value === width || value === height) as Dimension
  }, [output])

  const transformedOutput = React.useMemo(() => {
    return output.map(value => value === dimensionType && size !== null ? size : 0.0)
  }, [dimensionType, output, size])

  const dimensionValue = useTransform(value, input, transformedOutput)

  React.useLayoutEffect(() => {
    const adjustDimension = () => {
      const { current: element } = ref
      if (element instanceof HTMLElement) {
        switch (dimensionType) {
          case 'height':
            return setSize(element.scrollHeight)
          case 'width':
            return setSize(element.scrollWidth)
        }
      }
    }

    adjustDimension()

    window.addEventListener('resize', adjustDimension)

    return () => {
      window.removeEventListener('resize', adjustDimension)
    }
  }, [dimensionType, ref])

  return dimensionValue
}
