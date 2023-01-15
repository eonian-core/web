import { motion, MotionStyle, MotionValue, useSpring, useTransform, useWillChange } from "framer-motion";
import { useScrollYContext } from "./parallax-container";
import styles from './parallax-block.module.scss'

export interface ParallaxBlockProps {
    x: number;
    y: number;
    /** Multiplier how to increase size of the block, 1 by default */
    scale?: number;
    children: React.ReactNode;
    styles?: MotionStyle
    spring?: Motion.SpringOptions
}

export const ParallaxBlock = ({ x, y, scale = 1, styles: motionStyles = {}, spring, children }: ParallaxBlockProps) => {
    const size = window.screen.width * scale;
    const halfSize = size / 2;

    const scrollYProgress = useScrollYContext()!;
    const newY = useParalaxProgress(scrollYProgress, y, halfSize, scale, spring);

    const willChange = useWillChange();
    return (
        <motion.div
            className={styles.parallaxBlock}
            style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                willChange,
                y: newY,
                x: -halfSize,
                ...motionStyles
            }}
        >
            {children}
        </motion.div>
    );
};

/** Use scroll progress to calculate new y position of paralax block*/
export const useParalaxProgress = (scrollYProgress: MotionValue<number>, y: number, halfSize: number, scale: number, spring: Motion.SpringOptions = {}) => {
    const translate = 100 * (1.5 - y) * scale;

    const transform = useTransform(
        scrollYProgress,
        [1, 0],
        [-translate - halfSize, translate - halfSize]
    );

    return useSpring(transform, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
        ...spring
    });
}