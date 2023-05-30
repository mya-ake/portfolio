import { css } from "@shared/styles/css.ts";
import { Logo } from "@shared/symbol/Logo.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import type { ComponentChildren } from "preact";

const styles = {
  header: css({
    textAlign: "center",
    py: "$4",
  }),
  link: css({
    lineHeight: "1",
    fontSize: "$2xl",
    color: "inherit",
    textDecoration: "none",
  }),
};

type Props = {
  children?: ComponentChildren;
};

export function DefaultHeader(props: Props) {
  return (
    <header>
      <div class={styles.header()}>
        <InternalLink href="/" class={styles.link()}>
          <Logo />
        </InternalLink>
      </div>
      {props.children}
    </header>
  );
}
