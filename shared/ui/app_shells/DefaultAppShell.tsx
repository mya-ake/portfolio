/** @jsx h */
import { ComponentChildren, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { css } from "@shared/styles/css.ts";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { DefaultHeader } from "./children/DefaultHeader.tsx";
import { DefaultFooter } from "./children/DefaultFooter.tsx";

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display&display=swap"
          rel="stylesheet"
        />
      </Head>

      <DefaultHeader />

      <main class={styles.main()}>{children}</main>

      <Box css={{ marginTop: "$16" }}>
        <DefaultFooter />
      </Box>
    </Grid>
  );
}
