/** @jsx h */
import { h } from "preact";
import { DefaultAppShell } from "@shared/app_shells/DefaultAppShell.tsx";

export function Home() {
  return (
    <DefaultAppShell>
      <h1>Top Page</h1>

      <section>
        <h2>About</h2>
      </section>

      <section>
        <h2>Recent Activities</h2>
      </section>

      <section>
        <h2>GitHub Activities</h2>
      </section>
    </DefaultAppShell>
  );
}
