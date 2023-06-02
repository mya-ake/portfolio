import { ComponentChildren, createElement, JSX } from "preact";
import { clsx } from "clsx";
import { CSS, css, filterInvalidStyle, FontSize } from "@shared/styles/css.ts";
import { srOnlyStyle } from "@shared/styles/utility_styles.ts";

const style = css({
  margin: 0,
  fontWeight: "bolder",
});

export type Level = "1" | "2" | "3" | "4" | "5" | "6";
const fontSizeMap: Record<Level, FontSize> = {
  "1": "3xl",
  "2": "2xl",
  "3": "xl",
  "4": "lg",
  "5": "base",
  "6": "base",
};

type Leading = "none" | "base";
const leadingMap: Record<Leading, string> = {
  none: "1",
  base: "1.3",
};

export type HeadingProps = {
  level: Level;
  srOnly?: boolean;
  children?: ComponentChildren;
  leading?: Leading;
  fontSize?: FontSize;
  css?: CSS;
} & JSX.HTMLAttributes<HTMLHeadElement>;

export function Heading(props: HeadingProps) {
  const {
    level,
    leading = "base",
    srOnly = false,
    children,
    fontSize,
    css = {},
    style: attrStyle,
    ...attrs
  } = props;

  const className = clsx(
    srOnly && srOnlyStyle().toString(),
    style({
      css: {
        ...filterInvalidStyle({
          fontSize: fontSize ? `$${fontSize}` : `$${fontSizeMap[level]}`,
          lineHeight: leadingMap[leading],
        }),
        ...css,
      },
    }).toString(),
  );

  return createElement(`h${level}`, {
    ...attrs,
    class: className,
    style: attrStyle,
  }, children);
}
