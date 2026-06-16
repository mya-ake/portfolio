import { ComponentChildren } from "preact";
import { clsx } from "clsx";

type ListStyleType = "arrow" | "disc" | "none";

const markerMap: Record<ListStyleType, string> = {
  // editorial "▸" markers in the accent colour; each item becomes a flex row
  arrow:
    "p-0 list-none [&>li]:flex [&>li]:gap-2 [&>li]:before:content-['▸'] [&>li]:before:text-accent [&>li]:before:shrink-0",
  disc: "pl-4 list-disc",
  none: "p-0 list-none",
};

type Props = {
  children: ComponentChildren;
  listStyleType?: ListStyleType;
  class?: string;
};

export function UnorderList(props: Props) {
  const { children, listStyleType = "arrow", class: cls } = props;
  const className = clsx(
    "grid gap-2 list-outside",
    markerMap[listStyleType],
    cls,
  );
  return <ul class={className}>{children}</ul>;
}
