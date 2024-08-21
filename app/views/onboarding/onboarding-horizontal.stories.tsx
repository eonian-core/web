import type { Meta, StoryObj } from '@storybook/react'
import { OnboardingHorizontal } from './onboarding-horizontal'
import { OnboardingStep } from './onboarding-body'

const meta: Meta<typeof OnboardingHorizontal> = {
  title: 'Components/OnboardingHorizontal',
  component: OnboardingHorizontal,
  tags: ['autodocs'],
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
        `}</style>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OnboardingHorizontal>

export const Default: Story = {
  args: {
    completed: [OnboardingStep.Unkown],
  },
}

export const AssetChosen: Story = {
  args: {
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen],
  },
}

export const AmountEntered: Story = {
  args: {
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered],
  },
}

export const WalletConnected: Story = {
  args: {
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected],
  },
}

export const TramsactionsApproved: Story = {
  args: {
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved],
  },
}

export const EmailLinked: Story = {
  args: {
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved, OnboardingStep.EmailLinked],
  },
}
