/** @jsx h */
import { ComponentChildren, h } from "preact";
import { CSS, css, filterInvalidStyle } from "@shared/styles/css.ts";

const style = css({
  display: "grid",
});

type Props = {
  templateColumns?: CSS["gridTemplateColumns"];
  templateRows?: CSS["gridTemplateRows"];
  gap?: CSS["gap"];
  rowGap?: CSS["rowGap"];
  columnGap?: CSS["columnGap"];
  justifyContent?: CSS["justifyContent"];
  alignItems?: CSS["alignItems"];
  children: ComponentChildren;
  css?: CSS;
};

export function Grid(props: Props) {
  const { children, css = {} } = props;

  const className = style({
    css: {
      ...filterInvalidStyle({
        gridTemplateColumns: props.templateColumns,
        gridTemplateRows: props.templateRows,
        gap: props.gap,
        rowGap: props.rowGap,
        columnGap: props.columnGap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
      }),
      ...css,
    },
  });

  return <div class={className}>{children}</div>;
}
