/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { getCurrentYear } from "@shared/date/get_current_year.ts";
import { Logo } from "@shared/symbol/Logo.tsx";

const styles = {
  footer: css({
    paddingTop: "$2",
    px: "$4",
  }),
  profile: {
    container: css({}),
    avatar: css({}),
    name: css({}),
    icon: css({}),
    bio: css({}),
    bioText: css({}),
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
        <h1>Profile</h1>
        <div class={styles.profile.avatar()}>
          <p class={styles.profile.name()}>mya-ake</p>
          <img
            src="/images/avatar.jpg"
            width="60"
            height="60"
            class={styles.profile.icon()}
          />
          <div class={styles.profile.bio()}>
            <p class={styles.profile.bioText()}>猫好きのwebエンジニア。</p>
          </div>
        </div>
      </div>

      <div class={styles.copyright()}>
        <span class={styles.copyrightText()}>
          &copy; {currentYear} <Logo />
        </span>
      </div>
    </footer>
  );
}
