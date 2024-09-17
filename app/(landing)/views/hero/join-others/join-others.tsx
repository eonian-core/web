'use client'

import type { CSSProperties, PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './join-others.module.scss'
import { useInterval } from './use-interval'
import { avatars } from './images/images'

const placeholder = createPlaceholder() // In case if some URL is broken

const ONE_SECOND = 1000 // ms

export function JoinOthers({ children }: PropsWithChildren) {
  const [index, setIndex] = useState(0)

  const toShow = 3
  useInterval(() => {
    if (index + 2 * toShow < avatars.length) {
      setIndex(index + toShow)
      return
    }

    setIndex(0)
  }, 3 * ONE_SECOND)

  const visibleAvatars = avatars.slice(index, index + toShow)
  if (visibleAvatars.length < toShow)
    visibleAvatars.push(...avatars.slice(0, toShow - visibleAvatars.length))

  return (
    <div className={styles.container}>
      {visibleAvatars.map((avatar, index) => {
        return (
          <Image
            style={{ '--avatar-index': index } as CSSProperties}
            className={styles.image}
            key={index}
            src={avatar}
            alt="avatar"
            width={28}
            height={28}
            placeholder="blur"
            blurDataURL={placeholder}
            onError={(event) => {
              const image = event.target as HTMLImageElement
              image.src = placeholder
            }}
          />
        )
      })}
      <span>{children}</span>
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
