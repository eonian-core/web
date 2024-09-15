'use client'

import React from 'react'
import { useNotifyTokenContext } from '@/views/notify-token-drawer/notify-token-drawer'

export function NotifyToken() {
  const { open } = useNotifyTokenContext()
  return <>
    <a href="#" onClick={open}>More cryptocurrencies</a>
  </>
}
