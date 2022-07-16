/** @jsx h */
import { h } from "preact";
import { DefaultLayout } from "@shared/layouts/DefaultLayout.tsx";
import { h1Style } from "@shared/styles/text.ts";

export default function Home() {
  return (
    <DefaultLayout>
      <main>
        <h1 class={h1Style()}>Top Page</h1>
      </main>
    </DefaultLayout>
  );
}
