import { ComponentChildren, createElement } from "preact";
import { clsx } from "clsx";
import { CSS, css, FontSize, FontWeight } from "@shared/styles/css.ts";

const style = css({
  margin: 0,
});

type Leading = "none" | "paragraph";
const leadingMap: Record<Leading, string> = {
  none: "1",
  paragraph: "1.5",
};

type LineStyle = "new-line" | "nowrap";
const lineStyleMap: Record<LineStyle, string> = {
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
};

export function Text(props: Props) {
  const {
    as = "p",
    children,
    fontSize = "base",
    fontWeight = "normal",
    leading = "none",
    lineStyle = "new-line",
    css = {},
  } = props;

  const className = clsx(
    props.class?.toString(),
    style({
      css: {
        fontSize: `$${fontSize}`,
        fontWeight,
        lineHeight: leadingMap[leading],
        whiteSpace: lineStyleMap[lineStyle],
        ...css,
      },
    }).toString(),
  );

  return createElement(as, { class: className }, children);
}
