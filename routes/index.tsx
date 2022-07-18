/** @jsx h */
import { h } from "preact";
import { DefaultAppShell } from "@shared/app-shells/DefaultAppShell.tsx";

export default function Home() {
  return (
    <DefaultAppShell>
      <main>
        <h1>Top Page</h1>
      </main>
    </DefaultAppShell>
  );
}
