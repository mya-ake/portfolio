import { ComponentChildren } from "preact";
import { clsx } from "clsx";

type ListStyleType = "arrow" | "disc" | "none";

const markerMap: Record<ListStyleType, string> = {
  // editorial "▸" markers in the accent colour. The marker is absolutely
  // positioned in a left gutter (not a flex row) so a nested <ul>/<ol> inside an
  // <li> flows as a normal block instead of being laid out beside the text.
  arrow:
    "p-0 list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['▸'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-accent",
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
