import { ComponentChildren } from "preact";
import { css } from "@shared/styles/css.ts";
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
    <>
      <DefaultHeader />

      <main class={styles.main()}>{children}</main>

      <SimpleFooter />
    </>
  );
}
