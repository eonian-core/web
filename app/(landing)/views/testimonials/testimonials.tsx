import React from 'react'

import { useIsDesktopOrSmaller } from '../../../components/resize-hooks/screens'
import IconChevron from '../../../components/icons/icon-chevron'
import Button from '../../../components/button/button'
import { WrapperLink } from '../../../components/links/wrapper-link'
import type { LinkWithIconProps } from '../../../components/links/links'
import Container from '../../../components/contrainer/container'
import { showEarn } from '../../../features'
import styles from './testimonials.module.scss'
import CustomTweet from './custom-tweet'
import StaticContent from './static-content'

interface Props {}

export default function Testimonials({ children }: React.PropsWithChildren<Props>) {
  return <Container className={styles.testimonials}>{children}</Container>
}

Testimonials.CTA = function CTA({ children, href }: React.PropsWithChildren<LinkWithIconProps>) {
  const isDesktop = useIsDesktopOrSmaller()
  if (!showEarn) {
    return null
  }
  return (
    <WrapperLink href={href}>
      <Button size={isDesktop ? 'md' : 'lg'} icon={<IconChevron />} dark wide round bordered iconPosition="right">
        {children}
      </Button>
    </WrapperLink>
  )
}

Testimonials.Content = function Content({ children }: React.PropsWithChildren) {
  return <div className={styles.content}>{children}</div>
}

Testimonials.Ribbon = function Ribbon({ children }: React.PropsWithChildren) {
  const array = React.Children.toArray(children)

  const list = (className: string) => (
    <ul className={className}>
      {array.map((child, index) => (
        <li className={styles.tweetContainer} key={index} data-index={index}>
          <StaticContent>{child}</StaticContent>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={styles.ribbonContainer}>
      {list(styles.ribbon)}
      {list(styles.ribbonMirror)}
    </div>
  )
}

Testimonials.Tweet = CustomTweet
