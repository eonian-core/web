import type { Meta, StoryObj } from '@storybook/react'
import { OnboardingBody, OnboardingStep } from './onboarding-body'

const meta: Meta<typeof OnboardingBody> = {
  title: 'Components/OnboardingBody',
  component: OnboardingBody,
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
type Story = StoryObj<typeof OnboardingBody>

export const Default: Story = {
  args: {
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown],
  },
}

export const Show: Story = {
  args: {
    show: true,
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown],
  },
}

export const ShowHeader: Story = {
  args: {
    showHeader: true,
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown],
  },
}

export const AssetChosen: Story = {
  args: {
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen],
  },
}

export const AmountEntered: Story = {
  args: {
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered],
  },
}

export const WalletConnected: Story = {
  args: {
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected],
  },
}

export const TramsactionsApproved: Story = {
  args: {
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved],
  },
}

export const EmailLinked: Story = {
  args: {
    linkEmail: () => {},
    placeholder: '200 BTC',
    completed: [OnboardingStep.Unkown, OnboardingStep.AssetChosen, OnboardingStep.AmountEntered, OnboardingStep.WalletConnected, OnboardingStep.TramsactionsApproved, OnboardingStep.EmailLinked],
  },
}
