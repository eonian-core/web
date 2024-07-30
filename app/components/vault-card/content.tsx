import type { PropsWithChildren } from 'react'
import IconShieldHeart from '../icons/icon-shield-heart'
import IconPalmTree from '../icons/icon-paml-tree'
import type { TokenProps } from './token'
import { Tag, Tags, Token, TokenHeader } from './token'
import type { TokenSymbol } from '@/types'

// TODO: move this compoenents to mdx file

export interface DefinedTokenProps extends PropsWithChildren<Omit<TokenProps, 'token'>> {}

export function EthToken({ children, ...props }: DefinedTokenProps) {
  return <Token token="ETH" {...props}>
        <TokenHeader>Ethereum Vault</TokenHeader>

        <Tags>
            <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
            <Tag bordered>Blue-chip</Tag>
            <Tag bordered>Save and Forget</Tag>
        </Tags>

        {children}
    </Token>
}

export function BtcToken({ children, ...props }: DefinedTokenProps) {
  return <Token token="BTCB" {...props}>
        <TokenHeader>Bitcoin Vault</TokenHeader>

        <Tags>
            <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
            <Tag bordered>Blue-chip</Tag>
            <Tag bordered>Save and Forget</Tag>
        </Tags>

        {children}
    </Token>
}

export function BnbToken({ children, ...props }: DefinedTokenProps) {
  return <Token token="BNB" {...props}>
        <TokenHeader>BNB Vault</TokenHeader>

        <Tags>
            <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
            <Tag bordered>Blue-chip</Tag>
            <Tag bordered>Save and Forget</Tag>
        </Tags>

        {children}
    </Token>
}

export function UsdtToken({ children, ...props }: DefinedTokenProps) {
  return <Token token="USDT" {...props}>
        <TokenHeader>Tether Vault</TokenHeader>

        <Tags>
            <Tag icon={<IconPalmTree />}>Earn Passively</Tag>
            <Tag bordered>Stable</Tag>
            <Tag bordered>Zero Fee Insurance</Tag>
        </Tags>

        {children}
    </Token>
}

export function UsdcToken({ children, ...props }: DefinedTokenProps) {
  return <Token token="USDC" {...props}>
        <TokenHeader>USD Coin Vault</TokenHeader>

        <Tags>
            <Tag icon={<IconPalmTree />}>Earn Passively</Tag>
          <Tag bordered>Stable</Tag>
          <Tag bordered>Zero Fee Insurance</Tag>
        </Tags>

        {children}
    </Token>
}

export function DaiToken({ children, ...props }: DefinedTokenProps) {
  return <Token token="DAI" {...props}>
        <TokenHeader>DAI Vault</TokenHeader>

        <Tags>
            <Tag icon={<IconPalmTree />}>Earn Passively</Tag>
            <Tag bordered>Stable</Tag>
            <Tag bordered>Zero Fee Insurance</Tag>
        </Tags>

        {children}
    </Token>
}

type TokenComponentMap = {
  [K in TokenSymbol]: React.ComponentType<DefinedTokenProps>
}

export const tokensMap: TokenComponentMap = {
  ETH: EthToken,
  BTCB: BtcToken,
  BNB: BnbToken,
  USDT: UsdtToken,
  USDC: UsdcToken,
  DAI: DaiToken,
}
