/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
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
      <Section
        level="1"
        heading={translate("home:heading")}
        headingIsSrOnly={true}
        class={styles.container()}
      >
        <Section level="2" heading={"About"}>
          <p class={styles.section.text()}>mya-ake(みゃけ)です。</p>
        </Section>

        <Section level="2" heading={"Recent Activities"}>
        </Section>

        <Section level="2" heading={"GitHub Activities"}>
        </Section>
      </Section>
    </DefaultAppShell>
  );
}
