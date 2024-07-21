import React from 'react'
import IconBNB from './icon-bnb'
import IconEthereum from './icon-ethereum'
import IconBitcoin from './icon-bitcoin'
import IconTether from './icon-tether'
import IconUSDC from './icon-usdc'
import IconDAI from './icon-dai'
import type { TokenSymbol } from '@/types'

interface Props extends React.SVGProps<SVGSVGElement> {
  symbol: TokenSymbol
  noBackground?: boolean
}

const iconLookupMap: Record<TokenSymbol, React.FC<Omit<Props, 'symbol'>>> = {
  BTC: IconBitcoin,
  ETH: IconEthereum,
  USDT: IconTether,
  USDC: IconUSDC,
  DAI: IconDAI,
  BNB: IconBNB,
}

const IconCoin: React.FC<Props> = ({ symbol, ...svgProps }) => {
  const Icon = iconLookupMap[symbol]
  return <Icon {...svgProps} />
}

export default IconCoin
