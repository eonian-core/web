import React from 'react'

import { Card, CardBody, Spinner } from '@heroui/react'
import clsx from 'clsx'
import styles from './form.module.scss'
import { ArrowDividerBody } from './arrow-divider/arrow-divider-body'
import { WalletInputIcon } from './input-icon/input-icon'
import stylesInput from './form-input/form-input.module.scss'
import { RawFormInput } from './raw-form-input/raw-form-input'
import { FormButtonBody } from './form-button/form-button-body'
import { FormHeaderBody, TabButton } from './form-header/form-header-body'
import { CircleSkeleton } from '@/components/loader/skeleton-loader'

export function FormSkeleton() {
  return (
    <div className={clsx(styles.container, styles.disableAnimation)}>
      <Card>
        <FormHeaderBody>
          <TabButton>Save</TabButton>
          <TabButton>Withdraw</TabButton>
        </FormHeaderBody>

        <CardBody className={styles.fragment}>
          <RawFormInput
            label={'Wallet'}
            className={stylesInput.input}
            placeholder={'0'}
            inputStart={<WalletInputIcon />}
            price={<span>$0</span>}
            preview
                    >0</RawFormInput>

          <ArrowDividerBody />

          <RawFormInput
            label={'Savings Account'}
            placeholder={'0'}
            inputStart={<CircleSkeleton height={24} width={24} />}
            price={<span>$0</span>}
            preview
                    >0</RawFormInput>

          <FormButtonBody>
            <Spinner color="current" size="md" />
          </FormButtonBody>
        </CardBody>
      </Card>
    </div>
  )
}
