import { ComponentChildren, createElement, JSX } from "preact";
import { clsx } from "clsx";

export type FontSize =
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

const fontSizeMap: Record<FontSize, string> = {
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

type FontWeight = "normal" | "bold" | "bolder";
const fontWeightMap: Record<FontWeight, string> = {
  normal: "font-normal",
  bold: "font-bold",
  bolder: "font-bold",
};

type Leading = "none" | "paragraph";
const leadingMap: Record<Leading, string> = {
  none: "leading-none",
  paragraph: "leading-relaxed",
};

type LineStyle = "new-line" | "nowrap";
const lineStyleMap: Record<LineStyle, string> = {
  "new-line": "whitespace-pre-line",
  "nowrap": "whitespace-nowrap",
};

type Props = {
  as?: "p" | "span";
  children: ComponentChildren;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  leading?: Leading;
  lineStyle?: LineStyle;
  class?: string;
} & JSX.HTMLAttributes<HTMLParagraphElement>;

export function Text(props: Props) {
  const {
    as = "p",
    children,
    fontSize = "base",
    fontWeight = "normal",
    leading = "paragraph",
    lineStyle = "new-line",
    style: attrStyle,
    class: extraClass,
    ...restAttrs
  } = props;

  const className = clsx(
    fontSizeMap[fontSize],
    fontWeightMap[fontWeight],
    leadingMap[leading],
    lineStyleMap[lineStyle],
    extraClass?.toString(),
  );

  return createElement(
    as,
    { ...restAttrs, class: className, style: attrStyle },
    children,
  );
}
