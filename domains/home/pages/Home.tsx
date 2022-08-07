/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { h1Style, h2Style } from "@shared/styles/basic_styles.ts";
import { DefaultAppShell } from "@shared/app_shells/DefaultAppShell.tsx";

const styles = {
  container: css({
    container: "",
    px: "$4",
  }),
};

export function Home() {
  return (
    <DefaultAppShell>
      <div class={styles.container()}>
        <h1 class={h1Style()}>Top Page</h1>

        <section>
          <h2 class={h2Style()}>About</h2>
        </section>

        <section>
          <h2 class={h2Style()}>Recent Activities</h2>
        </section>

        <section>
          <h2 class={h2Style()}>GitHub Activities</h2>
        </section>
      </div>
    </DefaultAppShell>
  );
}
