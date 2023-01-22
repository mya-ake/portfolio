import { ComponentChildren, createElement } from "preact";
import { clsx } from "clsx";
import { Heading, HeadingProps, Level } from "../text/Heading.tsx";
import { CSS, css, FontSize } from "@shared/styles/css.ts";

const styles = {
  wrapper: css({}),
};

type Props = {
  as?: "section" | "article" | "nav" | "aside";
  level: Level;
  heading: string;
  children: ComponentChildren;
  headingProps?: Omit<HeadingProps, "level">;
  class?: string;
  css?: CSS;
  isContainer?: boolean;
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
    css = {},
    isContainer = false,
  } = props;

  const internalCss: CSS = {};
  if (isContainer) internalCss.container = "";

  const className = clsx(
    props.class?.toString(),
    styles.wrapper({
      css: {
        ...internalCss,
        ...css,
      },
    }).toString(),
  );

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
