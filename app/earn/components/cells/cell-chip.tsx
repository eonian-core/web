import { Chip } from '@nextui-org/react'

import styles from './cell-chip.module.scss'

export const CellChip: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Chip size="sm" variant="flat" className={styles.chip}>
      {children}
    </Chip>
  )
}
