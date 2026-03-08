import { ComponentChildren } from "preact";
import { clsx } from "clsx";

type Props = {
  children: ComponentChildren;
  class?: string;
};

export function OrderList(props: Props) {
  const className = clsx("grid list-outside list-decimal pl-4", props.class);
  return <ol class={className}>{props.children}</ol>;
}
