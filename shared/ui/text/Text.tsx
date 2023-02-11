import { ComponentChildren, createElement, JSX } from "preact";
import { clsx } from "clsx";
import {
  CSS,
  css,
  filterInvalidStyle,
  FontSize,
  FontWeight,
} from "@shared/styles/css.ts";

const style = css({
  margin: 0,
});

type Leading = "none" | "paragraph";
const leadingMap: Record<Leading, CSS["lineHeight"]> = {
  none: "1",
  paragraph: "1.5",
};

type LineStyle = "new-line" | "nowrap";
const lineStyleMap: Record<LineStyle, CSS["whiteSpace"]> = {
  "new-line": "pre-line",
  "nowrap": "nowrap",
};

type Props = {
  as?: "p" | "span";
  children: ComponentChildren;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  leading?: Leading;
  lineStyle?: LineStyle;
  class?: string;
  css?: CSS;
} & JSX.HTMLAttributes<HTMLParagraphElement>;

export function Text(props: Props) {
  const {
    as = "p",
    children,
    fontSize = "base",
    fontWeight = "normal",
    leading = "paragraph",
    lineStyle = "new-line",
    css = {},
    style: attrStyle,
  } = props;

  const className = clsx(
    props.class?.toString(),
    style({
      css: {
        ...filterInvalidStyle({
          fontSize: `$${fontSize}`,
          fontWeight,
          lineHeight: leadingMap[leading],
          whiteSpace: lineStyleMap[lineStyle] as string,
        }),
        ...css,
      },
    }).toString(),
  );

  return createElement(as, { class: className, style: attrStyle }, children);
}
