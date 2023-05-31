import { css } from "@shared/styles/css.ts";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Logo } from "@shared/symbol/Logo.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import type { ComponentChildren } from "preact";

const styles = {
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
    <header>
      <Box css={{ textAlign: "center", marginTop: "$4" }}>
        <InternalLink href="/" class={styles.link()}>
          <Logo />
        </InternalLink>
      </Box>
      {props.children}
    </header>
  );
}
