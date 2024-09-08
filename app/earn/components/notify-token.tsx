'use client'

import React from 'react'
import { useNotifyTokenContext } from '@/views/notify-token-drawer/notify-token-drawer'

export function NotifyToken() {
  const { open } = useNotifyTokenContext()
  return <>
    Dont have the token you want to save? <a href="#" onClick={open}>Request it here</a>
  </>
}
