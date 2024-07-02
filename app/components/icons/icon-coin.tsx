import React from 'react'
import IconBNB from './icon-bnb'
import IconEthereum from './icon-ethereum'
import IconBitcoin from './icon-bitcoin'
import IconTether from './icon-tether'
import IconUSDC from './icon-usdc'
import type { TokenSymbol } from '@/types'

interface Props extends React.SVGProps<SVGSVGElement> {
  symbol: TokenSymbol
}

const IconCoin: React.FC<Props> = ({ symbol, ...svgProps }) => {
  switch (symbol) {
    case 'BNB':
      return <IconBNB {...svgProps} />
    case 'ETH':
      return <IconEthereum {...svgProps} />
    case 'USDT':
      return <IconTether {...svgProps} />
    case 'USDC':
      return <IconUSDC {...svgProps} />
    case 'BTC':
    default:
      return <IconBitcoin {...svgProps} />
  }
}

export default IconCoin
