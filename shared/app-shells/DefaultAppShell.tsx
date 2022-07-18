/** @jsx h */
import { ComponentChildren, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { DefaultHeader } from "./children/DefaultHeader.tsx";

type Props = {
  children: ComponentChildren;
};

export function DefaultAppShell(props: Props) {
  const { children } = props;
  return (
    <div>
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

      <main>{children}</main>
    </div>
  );
}
