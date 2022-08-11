/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { h1Style } from "@shared/styles/basic_styles.ts";
import { getCurrentYear } from "@shared/date/get_current_year.ts";
import { Logo } from "@shared/symbol/Logo.tsx";
import { translate } from "@shared/i18n/mod.ts";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";

const styles = {
  footer: css({
    paddingTop: "$2",
  }),
  profile: {
    container: css({
      container: "",
      px: "$4",
      paddingBottom: "$4",
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
  copyright: {
    container: css({
      textAlign: "center",
      py: "$2",
    }),
    text: css({
      fontSize: "$sm",
      lineHeight: "1",
    }),
  },
};

const socialItems: { label: string; name: string; uri: string }[] = [{
  label: "GitHub",
  name: "mya-ake",
  uri: "https://github.com/mya-ake",
}, {
  label: "Twitter",
  name: "mya_ake",
  uri: "https://twitter.com/mya_ake",
}, {
  label: "Zenn",
  name: "mya_ake",
  uri: "https://zenn.dev/mya_ake",
}];

export function DefaultFooter() {
  const currentYear = getCurrentYear();
  return (
    <footer class={styles.footer()}>
      <div class={styles.profile.container()}>
        <div class={styles.profile.content()}>
          <h1 class={h1Style()}>{translate("profile:heading")}</h1>
          <div class={styles.profile.avatar()}>
            <p class={styles.profile.name()}>
              {translate("profile:nameWithYomi")}
            </p>
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

          <section>
            <h2>Social</h2>
            <UnorderList listStyleType="none">
              {socialItems.map(({ label, name, uri }) => (
                <ListItem key={label}>
                  <p>
                    {label}:{" "}
                    <StyledExternalLink href={uri}>{name}</StyledExternalLink>
                  </p>
                </ListItem>
              ))}
            </UnorderList>
          </section>
        </div>
      </div>

      <div class={styles.copyright.container()}>
        <span class={styles.copyright.text()}>
          {translate("footer:copyright", { year: currentYear })} <Logo />
        </span>
      </div>
    </footer>
  );
}
