import { Card, CardBody, Checkbox } from '@nextui-org/react'
import React from 'react'

import { useVaultContext } from '../hooks/use-vault-context'
import styles from './insurance-of-assets.module.scss'
import ExternalLink from '@/components/links/external-link'
import { ResourcesLinks } from '@/features'
import IconExternal from '@/components/icons/icon-external'

export const ASSET_INSURANCE_LABEL = 'Enable Asset Insurance'

export function InsuranceOfAssets() {
  const { insured, setInsured } = useVaultContext()

  const resourceLink = ResourcesLinks.TOS
  return (
    <Card className={styles.container}>
      <CardBody>
        <Checkbox
          isSelected={insured}
          onValueChange={setInsured}
          classNames={{ label: styles.checkboxLabel, wrapper: styles.checkboxWrapper }}
        >
          {ASSET_INSURANCE_LABEL}<div className={styles.description}>Against wallet and smart contract hacks</div>
        </Checkbox>
        <div className={styles.link}>
          <ExternalLink href={resourceLink.href} icon={<IconExternal size="0.9em" />} iconAtEnd>
            Terms & Conditions
          </ExternalLink>
        </div>
      </CardBody>
    </Card>
  )
}
