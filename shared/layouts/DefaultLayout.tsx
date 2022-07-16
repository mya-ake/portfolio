/** @jsx h */
import { ComponentChildren, h } from "preact";
import { Head } from "$fresh/runtime.ts";

type Props = {
  children: ComponentChildren;
};

export function DefaultLayout(props: Props) {
  const { children } = props;
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="/css/modern-normalize.css"
        />
      </Head>
      {children}
    </div>
  );
}
