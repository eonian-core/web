'use client'

import React from 'react'
import type { ImageProps } from 'next/image'
import Image from 'next/image'

import { useWalletWrapperContext } from '../../providers/wallet/wallet-wrapper-provider'
import IconWallet from '../icons/icon-wallet'
import styles from './wallet-info.module.scss'
import WalletNetworkSelector from './wallet-network-selector'
import WalletMenu from './wallet-menu'
import ErrorBoundaryWithFallback from './error-boundary-with-fallback'

function WalletInfo() {
  const { wallet } = useWalletWrapperContext()

  return (
    <div className={styles.container}>
      <WalletMenu>
        <WalletIcon src={wallet?.iconImageSrc} alt={wallet?.label} />

        <span className={styles.address}>
          <ShrinkedAddress>{wallet!.address}</ShrinkedAddress>
        </span>
      </WalletMenu>

      <WalletNetworkSelector />
    </div>
  )
}

export function ShrinkedAddress({ children: address }: { children: string }) {
  return `${address.substring(0, 6)}...${address.slice(-4)}`
}

export default WalletInfo

export interface WalletIconProps {
  src?: string
  alt?: string
}

/** Try to render wallet icon and fallback to simple wallet if cannot */
export function WalletIcon({ src, alt }: WalletIconProps) {
  return (
    <ErrorBoundaryWithFallback fallback={<IconWallet width={20} height={20} />}>
      <WalletIconBody src={src} alt={alt} width={20} height={20} />
    </ErrorBoundaryWithFallback>
  )
}

export interface WalletIconBodyProps extends Omit<ImageProps, 'src' | 'alt'>, WalletIconProps {
}

export function WalletIconBody({ src, alt, ...props }: WalletIconBodyProps) {
  if (!src)
    return <WalletIcon {...props} />

  const resultSrc = !src.includes('<svg')
    ? src
    // probably raw svg icon
    : rawSvgToDataUrl(src)

  if (!resultSrc.startsWith('data:image/svg+xml')) {
    console.error('Invalid icon source', src)
    return <WalletIcon {...props} />
  }

  return <Image src={resultSrc} alt={alt || 'wallet icon'} {...props} />
}

function rawSvgToDataUrl(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
