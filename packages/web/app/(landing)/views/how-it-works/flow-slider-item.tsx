import clsx from "clsx";
import React, { CSSProperties } from "react";
import { HIW_ANIMATION_DURATION, HIW_ITEM_WIDTH } from "./constants";
import styles from "./flow-slider-item.module.scss";
import { HIWContext } from "./how-it-works";

export interface FlowSliderItemProps {
  stepLabel: string;
  children: React.ReactNode;
}

const FlowSliderItem: React.FC<FlowSliderItemProps> = ({
  stepLabel,
  children,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { activeStep, setActiveStep, bottomSlider } =
    React.useContext(HIWContext);

  const handleClick = React.useCallback(() => {
    setActiveStep(stepLabel);
  }, [stepLabel, setActiveStep]);

  const isActive = stepLabel === activeStep;
  const activeRelativeOffsetY = useRelativeOffsetY(contentRef, bottomSlider, [
    bottomSlider,
    isActive,
  ]);
  const numberColor = usePointColor(stepLabel);

  const contentStyles = React.useMemo(() => {
    const styles = {
      transitionDuration: `${HIW_ANIMATION_DURATION}ms`,
    } as CSSProperties;
    const hasOffset = isActive && activeRelativeOffsetY != null;
    if (hasOffset) {
      styles["transform"] = `translateY(${activeRelativeOffsetY}px)`;
    }
    if (numberColor) {
      (styles as any)["--card-number-color"] = numberColor;
    }
    return styles;
  }, [isActive, activeRelativeOffsetY, numberColor]);

  const className = clsx(styles.container, {
    [styles.containerActive]: isActive,
  });
  return (
    <div
      className={className}
      style={{ width: `${HIW_ITEM_WIDTH}px` }}
      id={stepLabel}
    >
      <div
        ref={contentRef}
        onClick={handleClick}
        className={styles.wrapper}
        style={contentStyles}
      >
        <div className={styles.gradient} />
        <div className={styles.content}>
          <h3>{stepLabel}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

function usePointColor(key: string) {
  const [color, setColor] = React.useState<string | null>(null);
  React.useEffect(() => {
    const point = document.getElementById(`point-${key}`);
    const color = point?.getAttribute("data-color");
    color && setColor(color);
  }, [key]);
  return color;
}

function useRelativeOffsetY<T extends HTMLElement>(
  ref: React.RefObject<T>,
  reverse: boolean,
  deps: any[]
) {
  const [offsetY, setOffsetY] = React.useState<number | null>(null);
  React.useEffect(() => {
    const { current: element } = ref;
    const parent = element?.parentElement;
    if (!element || !parent) {
      return;
    }
    const { height } = element.getBoundingClientRect();
    const { height: parentHeight } = parent.getBoundingClientRect();
    setOffsetY(
      reverse ? -parentHeight / 2 : parentHeight - height - parentHeight / 2
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return offsetY;
}

export default FlowSliderItem;
