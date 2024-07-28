import type { Meta, StoryObj } from '@storybook/react'

import IconShieldHeart from '../icons/icon-shield-heart'
import IconPalmTree from '../icons/icon-paml-tree'
import { Distribution, Tag, Tags, Token, TokenAction, TokenApy, TokenFees, TokenGrowth, TokenHeader, TokenStats, YearlyReturns } from './token'

const meta: Meta<typeof Token> = {
  title: 'Components/Token',
  component: Token,
  tags: ['autodocs'],
  /** Will add .contentFix classname that fixes strange back that present only in storybook */
  decorators: [
    Story => (
      <div className="story-wrapper">
        <Story />
        <style global jsx>{`
          .story-wrapper {
            width: 100%;
            height: 100%;

            max-width: var(--width-700);
            padding: 0 var(--width-gap);
          }

          .contentFix {
            min-height: 30rem;
          }
        `}</style>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Token>

export const Default: Story = {
  args: {
    token: 'ETH',
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Ethereum Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Save and Forget</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+87.95%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~3%</TokenApy>
            <TokenGrowth>~85%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}

export const Etherium: Story = {
  args: {
    token: 'ETH',
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Ethereum Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Save and Forget</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+87.95%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~3%</TokenApy>
            <TokenGrowth>~85%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}

export const Bitcoin: Story = {
  args: {
    token: 'BTC',
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Bitcoin Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Save and Forget</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+159.94%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~3%</TokenApy>
            <TokenGrowth>~155%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}

export const Tether: Story = {
  args: {
    token: 'USDT',
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Tether Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconPalmTree />}>Earn Passively</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Zero Fee Insurance</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+9.59%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~9%</TokenApy>
            <TokenGrowth>~0%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}

export const DevEtherium: Story = {
  args: {
    token: 'ETH',
    development: true,
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Ethereum Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Save and Forget</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+87.95%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~3%</TokenApy>
            <TokenGrowth>~85%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}

export const DevBitcoin: Story = {
  args: {
    token: 'BTC',
    development: true,
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Bitcoin Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconShieldHeart />}>Zero Fee Insurance</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Save and Forget</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+159.94%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~3%</TokenApy>
            <TokenGrowth>~155%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}

export const DevTether: Story = {
  args: {
    token: 'USDT',
    development: true,
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>Tether Vault</TokenHeader>

        <Tags>
          <Tag icon={<IconPalmTree />}>Earn Passively</Tag>
          <Tag bordered>Innovation</Tag>
          <Tag bordered>Zero Fee Insurance</Tag>
        </Tags>

        <TokenStats>
          <YearlyReturns>+9.59%</YearlyReturns>
          <Distribution>
            <TokenFees>0%</TokenFees>
            <TokenApy>~9%</TokenApy>
            <TokenGrowth>~0%</TokenGrowth>
          </Distribution>
        </TokenStats>

        <TokenAction />
      </>
    ),
  },
}
