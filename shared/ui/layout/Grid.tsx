import { ComponentChildren, JSX } from "preact";
import { clsx } from "clsx";

type Props = {
  templateColumns?: string;
  templateRows?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  justifyContent?: string;
  alignItems?: string;
  class?: string;
  children: ComponentChildren;
};

export function Grid(props: Props) {
  const {
    templateColumns,
    templateRows,
    gap,
    rowGap,
    columnGap,
    justifyContent,
    alignItems,
    children,
  } = props;

  const inlineStyle: JSX.CSSProperties = {};
  if (templateColumns) inlineStyle.gridTemplateColumns = templateColumns;
  if (templateRows) inlineStyle.gridTemplateRows = templateRows;
  if (gap) inlineStyle.gap = gap;
  if (rowGap) inlineStyle.rowGap = rowGap;
  if (columnGap) inlineStyle.columnGap = columnGap;
  if (justifyContent) inlineStyle.justifyContent = justifyContent;
  if (alignItems) inlineStyle.alignItems = alignItems;

  return (
    <div class={clsx("grid", props.class)} style={inlineStyle}>{children}</div>
  );
}
