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
  fontWeight?: string;
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

  const fontWeightClass = fontWeight === "bolder"
    ? "font-bold"
    : `font-${fontWeight}`;

  const className = clsx(
    "m-0",
    `text-${fontSize}`,
    fontWeightClass,
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
