/** @jsx h */
import { ComponentChildren, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { css } from "@shared/styles/css.ts";
import { DefaultHeader } from "./children/DefaultHeader.tsx";
import { DefaultFooter } from "./children/DefaultFooter.tsx";

const styles = {
  container: css({
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "100vh",
    mx: 'auto',
    overflow: "auto",

    "@sm": {
      maxWidth: "$sm",
    },
    "@md": {
      maxWidth: "$md",
    },
    "@lg": {
      maxWidth: "$lg",
    },
  }),
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
    <div class={styles.container()}>
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

      <DefaultFooter />
    </div>
  );
}
