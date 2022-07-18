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
      <div class={styles.copyright()}>
        <span class={styles.copyrightText()}>
          &copy; {currentYear} <Logo />
        </span>
      </div>
    </footer>
  );
}
