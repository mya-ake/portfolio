import { css } from "@shared/styles/css.ts";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Logo } from "@shared/symbol/Logo.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import type { ComponentChildren } from "preact";

const styles = {
  header: css({
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

export function BasicHeader(props: Props) {
  return (
    <header class={styles.header()}>
      <Box css={{ textAlign: "center" }}>
        <InternalLink href="/" class={styles.link()}>
          <Logo />
        </InternalLink>
      </Box>
      {props.children}
    </header>
  );
}
