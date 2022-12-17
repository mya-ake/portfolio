/** @jsx h */
import { ComponentChildren, h } from "preact";
import { css } from "@shared/styles/css.ts";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { DefaultMeta } from "./children/DefaultMeta.tsx";
import { DefaultHeader } from "./children/DefaultHeader.tsx";
import { DefaultFooter } from "./children/footer/DefaultFooter.tsx";

const styles = {
  main: css({
    width: "100%",
    mx: "auto",
  }),
};

type Props = {
  children: ComponentChildren;
};

export function DefaultAppShell(props: Props) {
  const { children } = props;
  return (
    <Grid
      templateRows="auto 1fr auto"
      css={{ minHeight: "100vh", overflow: "auto" }}
    >
      <DefaultMeta />

      <DefaultHeader />

      <main class={styles.main()}>{children}</main>

      <Box css={{ marginTop: "$16" }}>
        <DefaultFooter />
      </Box>
    </Grid>
  );
}
