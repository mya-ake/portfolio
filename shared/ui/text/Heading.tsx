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

// Default level sizing uses the fluid display scale from S01 (text-h*), which
// carries its own paired line-height — so no leading class is applied by
// default, keeping that paired line-height the single source (review note D3).
const fontSizeMap: Record<Level, string> = {
  "1": "text-h1",
  "2": "text-h2",
  "3": "text-h3",
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
    leading,
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
    leading && leadingMap[leading],
    srOnly && "sr-only",
    extraClass?.toString(),
  );

  return createElement(`h${level}`, {
    ...restAttrs,
    class: className,
    style: attrStyle,
  }, children);
}
