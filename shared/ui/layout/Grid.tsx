/** @jsx h */
import { ComponentChildren, h } from "preact";
import { CSS, css } from "@shared/styles/css.ts";

const style = css({
  display: "grid",
});

type Props = {
  templateColumns?: string;
  gap?: CSS["gap"];
  rowGap?: CSS["rowGap"];
  columnGap?: CSS["columnGap"];
  children: ComponentChildren;
  css?: CSS;
};

export function Grid(props: Props) {
  const { children, css = {} } = props;

  const selfCss: CSS = {};
  if (props.templateColumns) {
    selfCss.gridTemplateColumns = props.templateColumns;
  }
  if (props.gap) selfCss.gap = props.gap;
  if (props.rowGap) selfCss.rowGap = props.rowGap;
  if (props.columnGap) selfCss.columnGap = props.columnGap;

  const className = style({
    css: {
      ...selfCss,
      ...css,
    },
  });

  return <div class={className}>{children}</div>;
}
