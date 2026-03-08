import { ComponentChildren } from "preact";
import { clsx } from "clsx";

type ListStyleType = "disc" | "none";
type Props = {
  children: ComponentChildren;
  listStyleType?: ListStyleType;
  class?: string;
};

export function UnorderList(props: Props) {
  const { children, listStyleType = "disc", class: cls } = props;
  const className = clsx(
    "grid list-outside",
    listStyleType === "disc" ? "pl-4 list-disc" : "p-0 list-none",
    cls,
  );
  return <ul class={className}>{children}</ul>;
}
