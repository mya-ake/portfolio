import { ComponentChildren } from "preact";
import { css } from "@shared/styles/css.ts";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { DefaultMeta } from "./children/DefaultMeta.tsx";
import { DefaultHeader } from "./children/DefaultHeader.tsx";
import {
  DefaultFooter,
  Props as DefaultFooterProps,
} from "./children/footer/DefaultFooter.tsx";
import { IconHead } from "@shared/head/IconHead.tsx";

const styles = {
  main: css({
    width: "100%",
    mx: "auto",
  }),
};

export type Props = {
  children: ComponentChildren;
  widgetMap: DefaultFooterProps["widgetMap"];
};

export function DefaultAppShell(props: Props) {
  const { children } = props;
  return (
    <Grid
      templateRows="auto 1fr auto"
      css={{ minHeight: "100dvh", overflow: "auto" }}
    >
      <IconHead />

      <DefaultMeta />

      <DefaultHeader />

      <main class={styles.main()}>{children}</main>

      <Box css={{ marginTop: "$16" }}>
        <DefaultFooter widgetMap={props.widgetMap} />
      </Box>
    </Grid>
  );
}
