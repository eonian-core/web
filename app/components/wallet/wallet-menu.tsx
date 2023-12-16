'use client'

import type { MenuItemProps, PopoverProps } from '@nextui-org/react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useAuth0 } from '@auth0/auth0-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import useRouterPush from '../links/use-router-push'
import { ULTRA_WIDE_SCREEN } from '../resize-hooks/screens'
import { useWindowSize } from '../resize-hooks/useWindowSize'
import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import { isAuthEnabled, useLogout } from '../../providers/auth'

interface ItemType extends MenuItemProps {
  key: string
  text: string
}

enum MenuOption {
  GO_TO_EARN = 'go_to_earn',
  DISCONNECT = 'disconnect',
  LOGOUT = 'logout',
}

const EARN_ROUTE = '/earn'

interface Props {
  children: React.ReactNode
}

export function useMenuItems(): ItemType[] {
  const pathname = usePathname()
  const isOnEarn = pathname.includes(EARN_ROUTE)
  const { isLoading, isAuthenticated } = useAuth0()

  return React.useMemo(() => {
    const items: ItemType[] = [
      {
        key: MenuOption.DISCONNECT,
        text: 'Disconnect',
        color: 'danger',
        showDivider: !isOnEarn,
      },
    ]

    if (!isOnEarn) {
      items.unshift({
        key: MenuOption.GO_TO_EARN,
        text: 'Go to Earn',
      })
    }

    if (isAuthEnabled() && !isLoading && isAuthenticated) {
      items.unshift({
        key: MenuOption.LOGOUT,
        text: 'Log out',
      })
    }

    return items
  }, [isOnEarn, isLoading, isAuthenticated])
}

export function useOnMenuClick() {
  const { disconnect } = useWalletWrapperContext()
  const [push] = useRouterPush()
  const logout = useLogout()

  return React.useCallback(
    (key: any | string | number) => {
      switch (key) {
        case MenuOption.DISCONNECT: {
          void disconnect()
          break
        }

        case MenuOption.GO_TO_EARN: {
          push(EARN_ROUTE)
          break
        }

        case MenuOption.LOGOUT: {
          logout()
          break
        }
      }
    },
    [push, disconnect, logout],
  )
}

const WalletMenu: React.FC<Props> = ({ children }) => {
  const { width = 0 } = useWindowSize()

  const menuPlacement: PopoverProps['placement'] = React.useMemo(() => {
    const isWideScreen = width >= ULTRA_WIDE_SCREEN
    return isWideScreen ? 'bottom' : 'bottom-end'
  }, [width])

  const menuItems = useMenuItems()
  const handleMenuClick = useOnMenuClick()

  return (
    <Dropdown placement={menuPlacement}>
      <DropdownTrigger>
        <Button size="sm">
          {children}
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleMenuClick}>
        {menuItems.map(({ key, text, ...restProps }) => (
          <DropdownItem key={key} {...restProps}>
            {text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default WalletMenu
