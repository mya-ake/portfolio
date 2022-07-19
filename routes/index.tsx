/** @jsx h */
import { h } from "preact";
import { DefaultAppShell } from "@shared/app_shells/DefaultAppShell.tsx";

export default function Home() {
  return (
    <DefaultAppShell>
      <main>
        <h1>Top Page</h1>
      </main>
    </DefaultAppShell>
  );
}
