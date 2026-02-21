import React from "react";

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  custom?: unknown;
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
  variants?: unknown;
  transition?: unknown;
  children?: React.ReactNode;
};

const createMotionComponent = (tag: string) => {
  const Component = React.forwardRef<HTMLElement, MotionProps>(
    ({ children, custom, initial, animate, exit, whileInView, viewport, variants, transition, ...rest }, ref) => {
      return React.createElement(tag, { ...rest, ref }, children);
    }
  );
  Component.displayName = `motion.${tag}`;
  return Component;
};

export const motion = new Proxy(
  {},
  {
    get(_target, prop: string) {
      return createMotionComponent(prop);
    },
  }
);

export const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export type { Variants };

type Variants = Record<
  string,
  | Record<string, unknown>
  | ((custom: unknown) => Record<string, unknown>)
>;
