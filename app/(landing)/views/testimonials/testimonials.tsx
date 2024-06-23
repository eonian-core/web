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

export default function Testimonials({ children }: React.PropsWithChildren) {
  return <Container className={styles.testimonials}>{children}</Container>
}

function CTA({ children, href }: React.PropsWithChildren<LinkWithIconProps>) {
  const isDesktop = useIsDesktopOrSmaller()
  if (!showEarn)
    return null

  return (
    <WrapperLink href={href}>
      <Button size={isDesktop ? 'md' : 'lg'} icon={<IconChevron />} dark wide round bordered iconPosition="right">
        {children}
      </Button>
    </WrapperLink>
  )
}
Testimonials.CTA = CTA

function Content({ children }: React.PropsWithChildren) {
  return <div className={styles.content}>{children}</div>
}
Testimonials.Content = Content

function Ribbon({ children }: React.PropsWithChildren) {
  const array = React.Children.toArray(children)

  return (
    <div className={styles.ribbonContainer}>
      <TestimonialsList className={styles.ribbon} testimonials={array} />
      <TestimonialsList className={styles.ribbonMirror} testimonials={array} />
    </div>
  )
}
Testimonials.Ribbon = Ribbon

function TestimonialsList({ className, testimonials }: { className: string; testimonials: Array<any> }) {
  return <ul className={className}>
    {testimonials.map((child, index) => (
      <li className={styles.tweetContainer} key={index} data-index={index}>
        <StaticContent>{child}</StaticContent>
      </li>
    ))}
  </ul>
}

Testimonials.Tweet = CustomTweet
