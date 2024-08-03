import { Card, CardBody, Checkbox } from '@nextui-org/react'
import React from 'react'

import clsx from 'clsx'
import { useVaultContext } from '../hooks/use-vault-context'
import styles from './insurance-of-assets.module.scss'
import ExternalLink from '@/components/links/external-link'
import { ResourcesLinks } from '@/features'
import IconExternal from '@/components/icons/icon-external'
import IconShieldWithDollar from '@/components/icons/shield-with-dollar'

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
              <h5>Asset Insurance</h5>
              <div className={styles.description}>Wallet and Smart Contract hacks</div>
            </div>
          </div>
        </Checkbox>

        <div className={styles.link}>
          <ExternalLink href={resourceLink.href} icon={<IconExternal size="0.9em" />} iconAtEnd>
            Terms & Conditions
          </ExternalLink>
        </div>
    </div>
  )
}
