'use client'

import type { CSSProperties, PropsWithChildren } from 'react'
import { createRef, useCallback, useState } from 'react'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './join-others.module.scss'
import { useInterval } from './use-interval'
import { avatars } from './images/images'

const placeholder = createPlaceholder() // In case if some URL is broken

const ONE_SECOND = 1000 // ms

export interface JoinOthersProps extends PropsWithChildren {
  href: string
}

export function JoinOthers({ children, href }: JoinOthersProps) {
  const router = useRouter()
  const clickHandler = useCallback(() => {
    router.push(href)
  }, [router])

  const [indexes, setIndexes] = useState([0, 1, 2])
  const [itemToChange, setItemToChange] = useState(0)

  const toShow = 3
  useInterval(0.2 * ONE_SECOND, () => {
    if (itemToChange < indexes.length) {
      const index = indexes[itemToChange]
      const newIndexes = [...indexes]

      if (index + toShow < avatars.length)
        newIndexes[itemToChange] = index + toShow
      else
        newIndexes[itemToChange] = itemToChange

      setIndexes(newIndexes)
    }

    setItemToChange((itemToChange + 1) % 15) // allow skip 12 ticks
  })

  const [avatarsWithRefs] = useState(() => avatars.map(avatar => ({
    ref: createRef<any>(),
    avatar,
  })))

  const visibleAvatars = indexes.map(i => avatarsWithRefs[i])

  return (
    <div className={styles.container} onClick={clickHandler}>
      <TransitionGroup className={styles.avatars}>
        {visibleAvatars.map(({ avatar, ref }, index) => {
          return (
            <CSSTransition
              key={avatar.src}
              nodeRef={ref}
              timeout={500}
              classNames={{
                enter: styles.itemEnter,
                enterActive: styles.itemEnterActive,
                enterDone: styles.itemEnterDone,
                exit: styles.itemExit,
                exitActive: styles.itemExitActive,
                exitDone: styles.itemExitDone,
              }}
            >
              <Image
                ref={ref}
                style={{ '--avatar-index': index } as CSSProperties}
                className={styles.image}
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
            </CSSTransition>
          )
        })}
      </TransitionGroup>
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
