import { ComponentChildren } from "preact";
import { css } from "@shared/styles/css.ts";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { DefaultMeta } from "./children/DefaultMeta.tsx";
import { DefaultHeader } from "./children/DefaultHeader.tsx";
import { SimpleFooter } from "./children/footer/SimpleFooter.tsx";

const styles = {
  main: css({
    width: "100%",
    mx: "auto",
  }),
};

type Props = {
  children: ComponentChildren;
};

export function SimpleAppShell(props: Props) {
  const { children } = props;

  return (
    <Grid
      templateRows="auto 1fr auto"
      css={{ minHeight: "100dvh", overflow: "auto" }}
    >
      <DefaultMeta />

      <DefaultHeader />

      <main class={styles.main()}>{children}</main>

      <SimpleFooter />
    </Grid>
  );
}
