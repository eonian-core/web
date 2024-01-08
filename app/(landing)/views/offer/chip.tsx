import styles from './chip.module.scss'

export interface ChipProps {
    text: string
    icon: React.ReactNode
}

export function Chip({ text, icon }: ChipProps) {
    return (
        <li className={styles.chip}>
            {icon}
            {text}
        </li>
    )
}