import type { Meta, StoryObj } from '@storybook/react'

import IconShieldHeart from '../icons/icon-shield-heart'
import { Distribution, Tag, Tags, Token, TokenApy, TokenFees, TokenFooter, TokenGrowth, TokenHeader, TokenState, TokenStats, YearlyReturns } from './token'

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

        <TokenFooter />
      </>
    ),
  },
}

export const DevEtherium: Story = {
  args: {
    token: 'ETH',
    state: TokenState.InDevelopment,
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

        <TokenFooter />
      </>
    ),
  },
}

export const PlannedBnb: Story = {
  args: {
    token: 'BNB',
    state: TokenState.Planned,
    contentClassName: 'contentFix',
    children: (
      <>
        <TokenHeader>BNB Vault</TokenHeader>

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

        <TokenFooter />
      </>
    ),
  },
}
