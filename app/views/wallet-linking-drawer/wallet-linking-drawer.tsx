import type { FC, PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { useDisclosure } from '@mantine/hooks'
import styles from './wallet-linking-drawer.module.scss'
import { LinkRecoveryEmailFlow } from './link-recovery-email-flow'
import { Drawer } from '@/components/drawer/drawer'

interface WalletLinkingContextProps {
  opened: boolean
  open: () => void
  close: () => void
}

const WalletLinkingContext = createContext<WalletLinkingContextProps | undefined>(undefined)

export const WalletLinkingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <WalletLinkingContext.Provider value={{ opened, open, close }}>
      <WalletLinkingDrawer {...{ opened, onClose: close }} />
      {children}
    </WalletLinkingContext.Provider>
  )
}

export function useWalletLinkingContext(): WalletLinkingContextProps {
  const context = useContext(WalletLinkingContext)
  if (!context)
    throw new Error('useWalletLinkingContext must be used within a WalletLinkingProvider')

  return context
}

export function WalletLinkingDrawer(props: { opened: boolean; onClose: () => void }) {
  return (
    <Drawer title={'Recovery email'} {...props}>
      <div className={styles.formWrapper}>
        <LinkRecoveryEmailFlow close={props.onClose}/>
      </div>
    </Drawer>
  )
}
