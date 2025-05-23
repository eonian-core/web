import { Checkbox } from '@heroui/react'
import React from 'react'

import clsx from 'clsx'
import { useVaultContext } from '../hooks/use-vault-context'
import styles from './insurance-of-assets.module.scss'
import ExternalLink from '@/components/links/external-link'
import { ResourcesLinks } from '@/features'
import IconExternal from '@/components/icons/icon-external'
import IconShieldWithDollar from '@/components/icons/shield-with-dollar'
import { Tag } from '@/components/chip/tag'

export function InsuranceOfAssets() {
  const { insured, setInsured } = useVaultContext()

  const resourceLink = ResourcesLinks.TOS
  return (
    <div className={styles.container}>
      <Checkbox
        isSelected={insured}
        onValueChange={setInsured}
        classNames={{
          base: clsx(styles.checkboxBase, { [styles.active]: insured }),
          wrapper: styles.checkboxWrapper,
        }}
        >
        <div className={styles.content}>
          <div className={styles.icon}>
            <IconShieldWithDollar
              width={'2.3rem'}
              height={'2.3rem'}
                />
          </div>
          <div className={styles.text}>
            <h5>Asset Insurance <Tag className={styles.tag}>Free</Tag></h5>
            <div className={styles.description}>Wallet and Smart Contract hacks</div>
          </div>
        </div>
      </Checkbox>

      <div className={styles.link}>
        <ExternalLink href={'https://leovs09.notion.site/Insurance-Coverage-Policy-b33c682e8d49426f80fee2bd14525edd?pvs=74'} icon={<IconExternal size="0.9em" />} iconAtEnd>
          Terms & Conditions
        </ExternalLink>
      </div>
    </div>
  )
}
