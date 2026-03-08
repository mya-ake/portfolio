import { ComponentChildren, createElement } from "preact";
import { clsx } from "clsx";
import { Heading, HeadingProps, Level } from "../text/Heading.tsx";

type Props = {
  as?: "section" | "article" | "nav" | "aside";
  level: Level;
  heading: string;
  headingProps?: Omit<HeadingProps, "level">;
  class?: string;
  isContainer?: boolean;
  children: ComponentChildren;
};

const wrapTag: Record<Level, "div" | "section"> = {
  "1": "div",
  "2": "section",
  "3": "section",
  "4": "section",
  "5": "section",
  "6": "section",
};

export function Section(props: Props) {
  const {
    as,
    level,
    heading,
    headingProps = {},
    children,
    isContainer = false,
  } = props;

  const className = clsx(
    isContainer && "app-container",
    props.class,
  ) || undefined;

  return createElement(
    as ?? wrapTag[level],
    { class: className },
    createElement<HeadingProps>(
      Heading,
      { level, ...headingProps },
      heading,
    ),
    children,
  );
}
