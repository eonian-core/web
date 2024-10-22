import type { FC, PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { useDisclosure } from '@mantine/hooks'
import styles from './suggest-chain-drawer.module.scss'
import { SuggestChainFlow } from './suggest-chain-flow'
import { Drawer } from '@/components/drawer/drawer'

interface SuggestChainContextProps {
  opened: boolean
  open: () => void
  close: () => void
}

const SuggestChainContext = createContext<SuggestChainContextProps | undefined>(undefined)

export const SuggestChainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <SuggestChainContext.Provider value={{ opened, open, close }}>
        <SuggestChainDrawer {...{ opened, onClose: close }} />
      {children}
    </SuggestChainContext.Provider>
  )
}

export function useSuggestChainContext(): SuggestChainContextProps {
  const context = useContext(SuggestChainContext)
  if (!context)
    throw new Error('useSuggestChainContext must be used within a SuggestChainProvider')

  return context
}

export function SuggestChainDrawer(props: { opened: boolean; onClose: () => void }) {
  return (
      <Drawer title={'Suggest chain'} {...props}>
        <div className={styles.formWrapper}>
          <SuggestChainFlow close={props.onClose}/>
        </div>
      </Drawer>
  )
}
