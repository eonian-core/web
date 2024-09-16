'use client'

import type { CSSProperties } from 'react'
import React from 'react'
import Image from 'next/image'
import tweets from '../../testimonials/tweets.json'
import styles from './join-others.module.scss'

interface TweetWithUser {
  user:
  | {
    profile_image_url_https: string | undefined
  }
  | undefined
}

const placeholder = createPlaceholder() // In case if some URL is broken

export function JoinOthers() {
  const [hours, setHours] = React.useState(new Date().getHours())

  const images = Object.values(tweets as unknown as TweetWithUser[])
    .map(tweet => tweet?.user?.profile_image_url_https)
    .filter(Boolean) as string[]

  React.useEffect(() => {
    const hours = new Date().getHours()
    setHours(hours)
  }, [])

  const toShow = 3
  const currentIndex = (hours + toShow) % images.length
  const visibleAvatars = images.slice(currentIndex, currentIndex + toShow)
  if (visibleAvatars.length < toShow)
    visibleAvatars.push(...images.slice(0, toShow - visibleAvatars.length))

  return (
    <div className={styles.container}>
      {visibleAvatars.map((src, index) => {
        return (
          <Image
            style={{ '--avatar-index': index } as CSSProperties}
            className={styles.image}
            key={src}
            src={src}
            alt="avatar"
            width={28}
            height={28}
            placeholder={placeholder}
            onError={(event) => {
              const image = event.target as HTMLImageElement
              image.src = placeholder
            }}
          />
        )
      })}
      <span>Join 99+ others</span>
    </div>
  )
}

// Generates placeholder avatar in encoded data URI (base64)
function createPlaceholder(): `data:image/${string}` {
  const content = toBase64(`
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fff">
        <path d="M 10 11 C 4.08 11 2 14 2 16 L 2 19 L 18 19 L 18 16 C 18 14 15.92 11 10 11 Z"/>
        <circle cx="10" cy="5.5" r="4.5"/>
      </g>
    </svg>
    `)
  return `data:image/svg+xml;base64,${content}`
}

function toBase64(str: string) {
  // eslint-disable-next-line n/prefer-global/buffer
  return typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)
}
