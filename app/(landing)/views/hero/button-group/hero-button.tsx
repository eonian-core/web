'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { usePostHog } from 'posthog-js/react'
import { useIsDesktopOrSmaller } from '../../../../components/resize-hooks/screens'
import { WrapperLink } from '../../../../components/links/wrapper-link'
import type { ButtonProps } from '../../../../components/button/button'
import Button from '../../../../components/button/button'
import styles from './hero-button.module.scss'
import { FeatureFlags, useFeatureFlags } from '@/experiments/feature-flags'

interface Props extends ButtonProps {
  children: React.ReactNode
  href?: string
  icon?: React.ReactNode
  bold?: boolean
}

const HeroButton: React.FC<Props> = ({
  children,
  href = '#',
  icon,
  bold,
  bordered,
  ...restProps
}) => {
  const isDesktop = useIsDesktopOrSmaller()
  const { flags } = useFeatureFlags()
  const flag = flags[FeatureFlags.LANDING_MAIN_CTA]

  return (
    <WrapperLink className={clsx(styles.button, {
      [styles.bold]: bold,
      [styles.dark]: !bordered,
    })} href={href}>
      <Button
        size={isDesktop ? 'md' : 'lg'}
        icon={icon}
        dark
        wide
        round
        bordered={bordered}
        iconPosition='left'
        {...restProps}>
        {flag === 'test' ? 'Just Click It!' : children}
      </Button>
    </WrapperLink>
  )
}

export default HeroButton
