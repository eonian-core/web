import IconExternal from '../icons/icon-external'
import ExternalLink from './external-link'
import type { LinkWithIconProps } from './links'
import { InternalLink } from './links'

export interface WrapperLinkProps extends LinkWithIconProps {
  withIcon?: boolean
}

export function WrapperLink({ href, children, withIcon, ...props }: WrapperLinkProps) {
  if (href.toString().startsWith('/') || href.toString().startsWith('#'))
    return <InternalLink href={href} {...props}>{children}</InternalLink>

  return <ExternalLink href={href} icon={withIcon && <IconExternal size="1em" />} iconAtEnd={withIcon} {...props}>{children}</ExternalLink>
}
