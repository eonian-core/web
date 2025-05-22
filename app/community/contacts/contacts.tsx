import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import IconDownOpen from '../../components/icons/icon-down-open'
import ExternalLink from '../../components/links/external-link'
import type { SocialLink } from '../../socials'
import { useLocalSocials, useOtherLanguageslSocials } from '../../socials'
import styles from './contacts.module.scss'

export function Contacts() {
  const localLinks = useLocalSocials()
  const otherLocales = useOtherLanguageslSocials()

  return (
    <div className={styles.contacts}>
      <ul>
        {localLinks.map(({ name, href, icon }) => (
          <li key={name}>
            <ExternalLink href={href} icon={icon}>
              {name}
            </ExternalLink>
          </li>
        ))}
      </ul>

      <OtherLanguages otherLocales={otherLocales} />
    </div>
  )
}

export default Contacts

export function OtherLanguages({ otherLocales }: { otherLocales: Record<string, Array<SocialLink>> }) {
  return <div className={styles.otherLanguagesCollapse}>
    <Dropdown placement="bottom">
      <DropdownTrigger>
        <div className={styles.otherLanguagesTrigger}>
          <span>Other Languages</span>

          <button className={styles.icon}>
            <IconDownOpen />
          </button>
        </div>
      </DropdownTrigger>

      <OtherLanguagesMenu otherLocales={otherLocales} />
    </Dropdown>
  </div>
}

function OtherLanguagesMenu({ otherLocales }: { otherLocales: Record<string, Array<SocialLink>> }) {
  const options = useOptions(otherLocales)
  return (
    <DropdownMenu>
      {options.map(({ name, href, icon }) => (
        <DropdownItem key={name}>
          <ExternalLink className={styles.otherLanguagesLink} href={href} icon={icon}>
            {name}
          </ExternalLink>
        </DropdownItem>
      ))}
    </DropdownMenu>
  )
}

function useOptions(otherLocales: Record<string, Array<SocialLink>>) {
  const mapLink = (link: SocialLink, locale: string) => ({
    ...link,
    name: `${link.name} (${locale.toUpperCase()})`,
  })

  const callback = () =>
    Object.keys(otherLocales)
      .map(locale => otherLocales[locale].map(link => mapLink(link, locale)))
      .flat()

  return React.useMemo(callback, [otherLocales])
}
