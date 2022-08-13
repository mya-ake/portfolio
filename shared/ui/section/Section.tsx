import { ComponentChildren, createElement } from "preact";
import { clsx } from "clsx";
import { Heading, HeadingProps, Level } from "../text/Heading.tsx";
import { CSS, css } from "@shared/styles/css.ts";

const styles = {
  wrapper: css({}),
};

type Props = {
  as?: "section" | "article" | "nav" | "aside";
  level: Level;
  heading: string;
  children: ComponentChildren;
  headingIsSrOnly?: boolean;
  class?: string;
  css?: CSS;
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
  const { as, level, heading, headingIsSrOnly = false, children, css = {} } =
    props;

  const className = clsx(
    props.class?.toString(),
    styles.wrapper({
      css: {
        ...css,
      },
    }).toString(),
  );

  return createElement(
    as ?? wrapTag[level],
    { class: className },
    createElement<HeadingProps>(
      Heading,
      { level, srOnly: headingIsSrOnly },
      heading,
    ),
    children,
  );
}