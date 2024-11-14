import type { FC, PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { useDisclosure } from '@mantine/hooks'
import styles from './suggest-token-drawer.module.scss'
import { SuggestTokenFlow } from './suggest-token-flow'
import { Drawer } from '@/components/drawer/drawer'

interface SuggestTokenContextProps {
  opened: boolean
  open: () => void
  close: () => void
}

const SuggestTokenContext = createContext<SuggestTokenContextProps | undefined>(undefined)

export const SuggestTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <SuggestTokenContext.Provider value={{ opened, open, close }}>
        <SuggestTokenDrawer {...{ opened, onClose: close }} />
      {children}
    </SuggestTokenContext.Provider>
  )
}

export function useSuggestTokenContext(): SuggestTokenContextProps {
  const context = useContext(SuggestTokenContext)
  if (!context)
    throw new Error('useSuggestTokenContext must be used within a SuggestTokenProvider')

  return context
}

export function SuggestTokenDrawer(props: { opened: boolean; onClose: () => void }) {
  return (
      <Drawer {...props}>
        <div className={styles.formWrapper}>
          <SuggestTokenFlow close={props.onClose}/>
        </div>
      </Drawer>
  )
}
