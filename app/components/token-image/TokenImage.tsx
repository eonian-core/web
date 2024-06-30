import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import BtcImage from './image/BTC_logo.png'
import EthImage from './image/ETH_logo.png'
import UsdtImage from './image/USDT_logo.png'
import UsdcImage from './image/USDC_logo.png'
import BnbImage from './image/BNB_logo.png'
import DaiImage from './image/DAI_logo.png'

import type { TokenSymbol } from '@/types'

interface Props {
  symbol: TokenSymbol
  width: number
  height: number
}

const imageLookupMap: Record<TokenSymbol, StaticImageData> = {
  BTC: BtcImage,
  ETH: EthImage,
  USDT: UsdtImage,
  USDC: UsdcImage,
  DAI: DaiImage,
  BNB: BnbImage,
}

export function TokenImage({ symbol, ...restProps }: Props) {
  return <Image src={imageLookupMap[symbol]} alt={symbol} {...restProps} />
}
