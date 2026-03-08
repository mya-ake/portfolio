import { ComponentChildren, createElement, JSX } from "preact";
import { clsx } from "clsx";
import type { FontSize } from "./Text.tsx";

const fontSizeClassMap: Record<FontSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

export type Level = "1" | "2" | "3" | "4" | "5" | "6";
const fontSizeMap: Record<Level, string> = {
  "1": "text-3xl",
  "2": "text-2xl",
  "3": "text-xl",
  "4": "text-lg",
  "5": "text-base",
  "6": "text-base",
};

type Leading = "none" | "base";
const leadingMap: Record<Leading, string> = {
  none: "leading-none",
  base: "leading-[1.3]",
};

export type HeadingProps = {
  level: Level;
  srOnly?: boolean;
  children?: ComponentChildren;
  leading?: Leading;
  fontSize?: FontSize;
} & JSX.HTMLAttributes<HTMLHeadingElement>;

export function Heading(props: HeadingProps) {
  const {
    level,
    leading = "base",
    srOnly = false,
    children,
    fontSize,
    style: attrStyle,
    class: extraClass,
    ...restAttrs
  } = props;

  const className = clsx(
    "m-0 font-bold",
    fontSize ? fontSizeClassMap[fontSize] : fontSizeMap[level],
    leadingMap[leading],
    srOnly && "sr-only",
    extraClass?.toString(),
  );

  return createElement(`h${level}`, {
    ...restAttrs,
    class: className,
    style: attrStyle,
  }, children);
}
