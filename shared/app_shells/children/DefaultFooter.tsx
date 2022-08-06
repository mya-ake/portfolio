/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { getCurrentYear } from "@shared/date/get_current_year.ts";
import { Logo } from "@shared/symbol/Logo.tsx";
import { translate } from "@shared/i18n/mod.ts";

const styles = {
  footer: css({
    paddingTop: "$2",
  }),
  profile: {
    container: css({
      container: '',
    }),
    content: css({
      display: "grid",
      gridTemplateColumns: "auto",
      gap: "$4",
    }),
    avatar: css({
      display: "grid",
      gridTemplateColumns: "auto auto",
      justifyContent: "start",
      alignItems: "center",
      gap: "$4",
    }),
    name: css({
      margin: "0",
      order: "1",
      fontWeight: "bolder",
      fontSize: "$xl",
      lineHeight: "1",
    }),
    icon: css({
      borderRadius: "50%",
      order: "0",
    }),
    bio: css({}),
    bioText: css({
      margin: "0",
      fontSize: "$base",
      lineHeight: "1.5",
      whiteSpace: "break-spaces",
    }),
  },
  copyright: css({
    textAlign: "center",
    py: "$2",
  }),
  copyrightText: css({
    fontSize: "$sm",
    lineHeight: "1",
  }),
};

export function DefaultFooter() {
  const currentYear = getCurrentYear();
  return (
    <footer class={styles.footer()}>
      <div class={styles.profile.container()}>
        <h1>{translate("profile:heading")}</h1>
        <div class={styles.profile.content()}>
          <div class={styles.profile.avatar()}>
            <p class={styles.profile.name()}>{translate("profile:name")}</p>
            <img
              src="/images/avatar.jpg"
              width="60"
              height="60"
              class={styles.profile.icon()}
            />
          </div>
          <div class={styles.profile.bio()}>
            <p class={styles.profile.bioText()}>{translate("profile:bio")}</p>
          </div>
        </div>
      </div>

      <div class={styles.copyright()}>
        <span class={styles.copyrightText()}>
          {translate("footer:copyright", { year: currentYear })} <Logo />
        </span>
      </div>
    </footer>
  );
}
