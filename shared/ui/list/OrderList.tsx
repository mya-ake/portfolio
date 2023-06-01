import { ComponentChildren } from "preact";
import { baseListStyle } from "./_style.ts";
import { CSS, css } from "@shared/styles/css.ts";
import { clsx } from "clsx";

type Props = {
  children: ComponentChildren;
  css?: CSS;
};

export function OrderList(props: Props) {
  const { children, css: extendCss = {} } = props;
  const className = clsx(
    baseListStyle({
      padding: "0 0 0 $4",
    }).toString(),
    css(extendCss).toString(),
  );

  return (
    <ol class={className}>
      {children}
    </ol>
  );
}
