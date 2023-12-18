'use client'

import React from 'react'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import Logo from '../logo/logo'
import IconConfetti from '../icons/icon-confetti'
import IconChevron from '../icons/icon-chevron'
import useNavigationLinks from './useNavigationLinks'

export default function Navigation() {
  const links = useNavigationLinks()
  return (
    <Navbar height="8rem" maxWidth="xl" className="fixed bg-transparent backdrop-blur-none">
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <Logo width={36} height={36} />
            <p className="ml-1 text-inherit">Eonian</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((item) => {
          return (
            <NavbarItem key={item.href}>
              <Link color="foreground" href={item.href} isExternal={item.external} showAnchorIcon={item.external}>
                {item.label}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="shadow" endContent={<IconConfetti width={14} height={14} className="mb-1" />}>
            Join the waitlist
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {links.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link color="foreground" className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
