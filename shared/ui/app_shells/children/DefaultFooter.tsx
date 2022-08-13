/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { getCurrentYear } from "@shared/date/get_current_year.ts";
import { Logo } from "@shared/symbol/Logo.tsx";
import { translate } from "@shared/i18n/mod.ts";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";
import { Text } from "@shared/ui/text/Text.tsx";
import { Section } from "@shared/ui/section/Section.tsx";

const styles = {
  footer: css({}),
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
      order: "1",
    }),
    icon: css({
      borderRadius: "50%",
      order: "0",
    }),
    bio: css({}),
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

function getSocialItems(): { label: string; name: string; uri: string }[] {
  return [{
    label: translate("social:github"),
    name: translate("social:gitHubName"),
    uri: "https://github.com/mya-ake",
  }, {
    label: translate("social:twitter"),
    name: translate("social:twitterName"),
    uri: "https://twitter.com/mya_ake",
  }, {
    label: translate("social:zenn"),
    name: translate("social:zennName"),
    uri: "https://zenn.dev/mya_ake",
  }];
}

export function DefaultFooter() {
  const currentYear = getCurrentYear();
  return (
    <footer class={styles.footer()}>
      <div class={styles.profile.container()}>
        <Section
          level="1"
          heading={translate("profile:heading")}
          class={styles.profile.content()}
        >
          <div class={styles.profile.avatar()}>
            <Text
              fontSize="xl"
              leading="none"
              fontWeight="bolder"
              class={styles.profile.name()}
            >
              {translate("profile:nameWithYomi")}
            </Text>
            <img
              src="/images/avatar.jpg"
              width="60"
              height="60"
              class={styles.profile.icon()}
            />
          </div>
          <div class={styles.profile.bio()}>
            <Text leading="paragraph">
              {translate("profile:bio")}
            </Text>
          </div>

          <Section level="2" heading={translate("social:heading")}>
            <UnorderList listStyleType="none">
              {getSocialItems().map(({ label, name, uri }) => (
                <ListItem key={label}>
                  <Text>
                    {label}:{" "}
                    <StyledExternalLink href={uri}>{name}</StyledExternalLink>
                  </Text>
                </ListItem>
              ))}
            </UnorderList>
          </Section>
        </Section>
      </div>

      <div class={styles.copyright.container()}>
        <Text fontSize="sm">
          {translate("footer:copyright", { year: currentYear })} <Logo />
        </Text>
      </div>
    </footer>
  );
}
