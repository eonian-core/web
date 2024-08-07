import React from 'react'

import { Card, CardBody, Spinner } from '@nextui-org/react'
import clsx from 'clsx'
import styles from './form.module.scss'
import { ArrowDividerBody } from './arrow-divider-body'
import { WalletInputIcon } from './components/input-icon'
import stylesInput from './form-input.module.scss'
import { RawFormInput } from './components/raw-form-input'
import { FormButtonBody } from './form-button-body'
import { FormHeaderBody, TabButton } from './form-header-body'
import { CircleSkeleton, OneLineSkeleton } from '@/components/loader/skeleton-loader'

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
                    >0</RawFormInput>

                <ArrowDividerBody />

                <RawFormInput
                    label={'Savings Account'}
                    placeholder={'0'}
                    inputStart={<CircleSkeleton height={24} width={24} />}
                    price={<span>$0</span>}
                    >0</RawFormInput>

                <FormButtonBody>
                    <Spinner color="current" size="md" />
                </FormButtonBody>
            </CardBody>
        </Card>
    </div>
  )
}
