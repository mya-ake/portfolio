import { ComponentChildren } from "preact";
import { baseListStyle } from "./_style.ts";
import { CSS, css } from "@shared/styles/css.ts";
import { clsx } from "clsx";

type ListStyleType = "disc" | "none";
type Props = {
  children: ComponentChildren;
  listStyleType?: ListStyleType;
  css?: CSS;
};

const computePadding = (listStyleType: ListStyleType) => {
  switch (listStyleType) {
    case "disc":
      return "0 0 0 $4";
    default:
      return "0";
  }
};

export function UnorderList(props: Props) {
  const { children, listStyleType = "disc", css: extendCss = {} } = props;
  const className = clsx(
    baseListStyle({
      padding: computePadding(listStyleType),
      listStyleType,
    }).toString(),
    css(extendCss).toString(),
  );

  return (
    <ul class={className}>
      {children}
    </ul>
  );
}
