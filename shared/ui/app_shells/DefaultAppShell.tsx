import { ComponentChildren } from "preact";
import { css } from "@shared/styles/css.ts";
import { Box } from "@shared/ui/layout/Box.tsx";
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
    <>
      <IconHead />

      <DefaultHeader />

      <main class={styles.main()}>{children}</main>

      <Box css={{ marginTop: "$16" }}>
        <DefaultFooter widgetMap={props.widgetMap} />
      </Box>
    </>
  );
}
