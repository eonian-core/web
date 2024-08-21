import '@mantine/core/styles/UnstyledButton.css'
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/CloseButton.css'
import '@mantine/core/styles/ModalBase.css'
import '@mantine/core/styles/Overlay.css'
import '@mantine/core/styles/Paper.css'
import '@mantine/core/styles/Drawer.css'

import type { DrawerProps as MantineDrawerProps, MantineSize } from '@mantine/core'
import { Drawer as MantineDrawer } from '@mantine/core'
import { useIsTabletOrSmaller } from '../resize-hooks/screens'

import styles from './drawer.module.scss'

type DrawerPosition = 'bottom' | 'left' | 'right' | 'top'

export interface DrawerProps extends MantineDrawerProps {
  desktopPosition?: DrawerPosition
  desktopSize?: MantineSize | string | number
}

export function Drawer({ desktopPosition = 'right', desktopSize = 'lg', ...props }: DrawerProps) {
  const isTabletOrSmaller = useIsTabletOrSmaller()

  return (<MantineDrawer
        position={isTabletOrSmaller ? 'bottom' : desktopPosition}
        offset={isTabletOrSmaller ? 5 : 10}
        radius={isTabletOrSmaller ? 'md' : 'lg'}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size={isTabletOrSmaller ? '90%' : desktopSize}
        className={styles.drawer}
        {...props}
    />)
}
