/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { Logo } from "@shared/symbol/Logo.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";

const styles = {
  header: css({
    textAlign: "center",
    py: "$2",
  }),
  link: css({
    lineHeight: "1",
    fontSize: "$2xl",
    color: "inherit",
    textDecoration: "none",
  }),
};

export function DefaultHeader() {
  return (
    <header class={styles.header()}>
      <InternalLink href="/" class={styles.link()}>
        <Logo />
      </InternalLink>
    </header>
  );
}
