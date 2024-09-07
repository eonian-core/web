import { Avatar, AvatarIcon } from '@nextui-org/react'
import type { CSSProperties } from 'react'

import styles from './user-avatar.module.scss'

interface Props {
  color: string
  index: number
}

export function UserAvatar({ color, index }: Props) {
  const style = { '--bg-avatar-color': color, '--avatar-index': index } as CSSProperties
  return (
    <Avatar
      size="sm"
      icon={<AvatarIcon />}
      style={style}
      classNames={{
        base: styles.base,
        icon: styles.icon,
      }}
    />
  )
}
