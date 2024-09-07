import { useApolloClient } from '@apollo/client'
import React from 'react'
import styles from './join-others.module.scss'
import { UserAvatar } from './user-avatar'
import { fetchHolders } from '@/api/protocol/vaults/fetch-holders'

const COLORS = ['hsl(341, 67%, 61%)', '#f37055', '#ef4e7b', '#a166ab', '#2657eb']

export async function JoinOthers() {
  const client = useApolloClient()
  const holders = await fetchHolders(client)
  return (
    <div className={styles.container}>
      {holders.slice(0, 3).map((_, index) => {
        const key = index + holders.length
        return <UserAvatar key={key} index={index} color={COLORS[key % COLORS.length]} />
      })}
      <span>Join {numberWithCommas(holders.length)} others</span>
    </div>
  )
}

function numberWithCommas(value: string | number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
