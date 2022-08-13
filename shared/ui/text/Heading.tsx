import { ComponentChildren, createElement } from "preact";
import { clsx } from "clsx";
import { css, FontSize } from "@shared/styles/css.ts";
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
};

export function Heading(props: HeadingProps) {
  const { level, leading = "base", srOnly = false, children } = props;

  const className = clsx(
    srOnly && srOnlyStyle().toString(),
    style({
      css: {
        fontSize: `$${fontSizeMap[level]}`,
        lineHeight: leadingMap[leading],
      },
    }).toString(),
  );

  return createElement(`h${level}`, {
    class: className,
  }, children);
}
