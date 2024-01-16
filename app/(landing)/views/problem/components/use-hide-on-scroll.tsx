import { MotionValue, useMotionValueEvent } from "framer-motion"
import React from "react"

export const useHideOnScroll = (scrollYProgress: MotionValue<number>) => {
    const [isVisible, setVisible] = React.useState<boolean>(true)

    const updateState = React.useCallback((value: number) => {
        if (value >= 1) {
            setVisible(false)
            return
        }
        setVisible(true)
    }, [setVisible])

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        updateState(value)
    })

    React.useEffect(() => {
        updateState(scrollYProgress.get())
    }, [scrollYProgress])

    return { isVisible }
}