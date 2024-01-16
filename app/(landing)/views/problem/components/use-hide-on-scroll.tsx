import { MotionValue, useMotionValueEvent } from "framer-motion"
import React from "react"

export const useSwitchOnScroll = (scrollYProgress: MotionValue<number>, onValue = 1, maintainEndState = false) => {
    const [isVisible, setVisible] = React.useState<boolean>(true)

    const updateState = React.useCallback((value: number) => {
        if (value >= onValue) {
            setVisible(false)
            return
        }
        
        if(!maintainEndState) {
            setVisible(true)
        }
    }, [setVisible, onValue])

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        updateState(value)
    })

    React.useEffect(() => {
        updateState(scrollYProgress.get())
    }, [scrollYProgress])

    return { isVisible }
}