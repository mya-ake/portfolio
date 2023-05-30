import { ComponentChildren } from "preact";
import { css } from "@shared/styles/css.ts";
import { BasicHeader } from "./children/header/BasicHeader.tsx";
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
    <>
      <BasicHeader />

      <main class={styles.main()}>{children}</main>

      <SimpleFooter />
    </>
  );
}
