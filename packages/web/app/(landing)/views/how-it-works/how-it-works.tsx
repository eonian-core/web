"use client";
import clsx from "clsx";
import { useInView } from "framer-motion";
import React, { useInsertionEffect } from "react";
import Container from "../../../components/contrainer/container";
import { useOnResizeEffect } from "../../../components/resize-hooks/useOnResizeEffect";
import { HIW_AUTOSCROLL_DURATION } from "./constants";
import FlowDiagram from "./flow-diagram";
import { FlowSliderItemProps } from "./flow-slider-item";
import styles from "./how-it-works.module.scss";

interface Props {
  children: React.ReactNode;
}

interface HIWContextState {
  bottomSlider: boolean;
  steps: string[];
  activeStep: string;
  setActiveStep: (label: string) => void;
}

const defaultHIWContextState = {
  bottomSlider: true,
  steps: [],
  activeStep: "",
  setActiveStep: () => {},
};
export const HIWContext = React.createContext<HIWContextState>(
  defaultHIWContextState
);

const HowItWorks: React.FC<Props> = ({ children }) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const diagramRef = React.useRef<FlowDiagram>(null);
  const stepLabels = useStepLabels(children);

  const isInView = useInView(containerRef);

  const [activeStep, setActiveStep] = React.useState(stepLabels[0]);

  useOnResizeEffect(() => {
    setActiveStep(stepLabels[0]);
  }, []);

  const contextValue: HIWContextState = React.useMemo(
    () => ({
      ...defaultHIWContextState,
      steps: stepLabels,
      activeStep,
      setActiveStep,
    }),
    [stepLabels, activeStep]
  );

  React.useEffect(() => {
    diagramRef.current?.selectPoint(activeStep);
  }, [activeStep]);

  React.useEffect(() => {
    if (!isInView) {
      return;
    }
    const interval = window.setInterval(() => {
      const index = stepLabels.indexOf(activeStep) + 1;
      const nextStep = stepLabels[index >= stepLabels.length ? 0 : index];
      setActiveStep(nextStep);
    }, HIW_AUTOSCROLL_DURATION);
    return () => window.clearInterval(interval);
  }, [isInView, activeStep, stepLabels]);

  const className = clsx(styles.container, {
    [styles.containerReverse]: contextValue.bottomSlider,
  });
  return (
    <Container ref={containerRef} className={className}>
      <HIWContext.Provider value={contextValue}>{children}</HIWContext.Provider>
      <FlowDiagram
        ref={diagramRef}
        onActiveStepChanged={setActiveStep}
        stepLabels={stepLabels}
      />
    </Container>
  );
};

function useStepLabels(children: React.ReactNode): string[] {
  return React.useMemo(() => extractStepLabels(children), [children]);
}

function extractStepLabels(children: React.ReactNode): string[] {
  const elements = React.Children.toArray(children) as React.ReactElement[];
  if (!Array.isArray(elements) || !elements.length) {
    return [];
  }

  const result = [];
  for (const { type, props } of elements) {
    if (props && "stepLabel" in props) {
      const itemProps = props as FlowSliderItemProps;
      result.push(itemProps.stepLabel);
      continue;
    }

    if (props && "children" in props) {
      const next = extractStepLabels(props.children);
      result.push(...next);
    }
  }
  return result;
}

export default HowItWorks;
