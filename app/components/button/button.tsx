import React, { useCallback } from 'react'

import clsx from 'clsx'
import styles from './button.module.scss'
import * as events from '@/analytics/events'

export interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'type'> {
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
  gradient?: boolean
  lightGradient?: boolean
  dark?: boolean
  wide?: boolean
  round?: boolean
  slightlyRound?: boolean
  disabled?: boolean
  development?: boolean
  icon?: React.ReactNode
  /** Display icon position, default right */
  iconPosition?: 'left' | 'right'
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  size = 'md',
  bordered = false,
  gradient = false,
  lightGradient = false,
  dark = false,
  wide = false,
  round = false,
  slightlyRound = false,
  disabled = false,
  development = false,
  icon,
  iconPosition = 'right',
  children,
  className,
  onClick,
  ...restProps
}) => {
  const classes = clsx(styles.button, styles[size], className, {
    [styles.bordered]: bordered,
    [styles.gradient]: gradient,
    [styles.lightGradient]: lightGradient,
    [styles.dark]: dark,
    [styles.icon]: !!icon,
    [styles.wide]: wide,
    [styles.round]: round,
    [styles.slightlyRound]: slightlyRound,
    [styles.disabled]: disabled,
    [styles.inDevelopment]: development,
    [styles.iconLeft]: iconPosition === 'left',
  })

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    events.track(children)

    onClick?.(event)
  }, [onClick, children])

  return (
    <button className={classes} onClick={handleClick} {...restProps}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  )
}

export default Button
