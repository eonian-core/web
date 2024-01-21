import clsx from "clsx"
import { MotionValue, useTransform, motion } from "framer-motion"

export interface TransformConfig {
    from: Array<number>
    to: Array<number>
}

interface ItemProps {
    progress: MotionValue<number>
    opacity?: TransformConfig
    scale?: TransformConfig
    translateY?: TransformConfig
    className?: string
}

export function ScrollItem({ 
    children, 
    progress,
    className, 
    opacity = { from: [0, 1], to: [1, 1] }, 
    scale = { from: [0, 1], to: [1, 1] }, 
    translateY 
}: React.PropsWithChildren<ItemProps>) {
    return (
        <motion.div style={{ 
            opacity: useTransformConfig(progress, opacity), 
            scale: useTransformConfig(progress, scale),
            translateY: useTransformConfig(progress, translateY), 
        }} 
            className={clsx(className, 'top-0 left-0 w-full h-full')}
        >
            {children}
        </motion.div>
    )
}

export const useTransformConfig = (progress: MotionValue<number>, config?: TransformConfig) => {
    if(!config) {
        return undefined
    }

    return useTransform(
        progress,
        config.from,
        config.to
    )
}