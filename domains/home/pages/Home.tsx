/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { h2Style } from "@shared/styles/basic_styles.ts";
import { srOnly } from "@shared/styles/utility_styles.ts";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { translate } from "@shared/i18n/mod.ts";

const styles = {
  container: css({
    container: "",
    display: "grid",
    gridTemplateColumns: "auto",
    gap: "$8",
    px: "$4",
  }),
  section: {
    text: css({
      margin: 0,
      fontSize: "$base",
    }),
  },
};

export function Home() {
  return (
    <DefaultAppShell>
      <div class={styles.container()}>
        <h1 class={srOnly()}>{translate("home:heading")}</h1>

        <section>
          <h2 class={h2Style()}>About</h2>
          <p class={styles.section.text()}>mya-ake(みゃけ)です。</p>
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
