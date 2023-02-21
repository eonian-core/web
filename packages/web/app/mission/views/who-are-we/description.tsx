import { PropsWithChildren } from "react"
import styles from './who-are-we.module.scss'

export const Description = ({children}: PropsWithChildren) => {
    return (
        <div className={styles.description}>
            {children}
        </div>
    )
}

export default Description