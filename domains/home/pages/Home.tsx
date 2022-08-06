/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { DefaultAppShell } from "@shared/app_shells/DefaultAppShell.tsx";

const styles = {
  container: css({
    container: "",
  }),
};

export function Home() {
  return (
    <DefaultAppShell>
      <div class={styles.container()}>
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
      </div>
    </DefaultAppShell>
  );
}
