import type { FC, PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { useDisclosure } from '@mantine/hooks'
import styles from './notify-token-drawer.module.scss'
import { NotifyChainFlow } from './notify-chain-flow'
import { Drawer } from '@/components/drawer/drawer'

interface NotifyTokenContextProps {
  opened: boolean
  open: () => void
  close: () => void
}

const NotifyTokenContext = createContext<NotifyTokenContextProps | undefined>(undefined)

export const NotifyTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <NotifyTokenContext.Provider value={{ opened, open, close }}>
        <NotifyChainDrawer {...{ opened, onClose: close }} />
      {children}
    </NotifyTokenContext.Provider>
  )
}

export function useNotifyTokenContext(): NotifyTokenContextProps {
  const context = useContext(NotifyTokenContext)
  if (!context)
    throw new Error('useNotifyTokenContext must be used within a NotifyTokenProvider')

  return context
}

export function NotifyChainDrawer(props: { opened: boolean; onClose: () => void }) {
  return (
      <Drawer title={'Suggest token'} {...props}>
        <div className={styles.formWrapper}>
          <NotifyChainFlow close={props.onClose}/>
        </div>
      </Drawer>
  )
}
