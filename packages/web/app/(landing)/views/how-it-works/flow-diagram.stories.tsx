import type { Meta, StoryObj } from "@storybook/react";
import FlowDiagram from "./flow-diagram";

const meta: Meta<typeof FlowDiagram> = {
  title: "HowItWorks/FlowDiagram",
  component: FlowDiagram,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="story-wrapper">
        <Story />
        <style global jsx>{`
          .story-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
        `}</style>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FlowDiagram>;

export const Default: Story = {
  args: {
    labels: [
      "Deposit",
      "Find Options",
      "Allocation",
      "Investment",
      "Aggregation",
      "Reinvestment",
      "Monitoring",
      "Withdraw",
    ],
  },
};
