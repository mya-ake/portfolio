/** @jsx h */
import { Fragment, h } from "preact";
import { css } from "@shared/styles/css.ts";
import { translate } from "@shared/i18n/mod.ts";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Copyright } from "./children/Copyright.tsx";

const styles = {
  footer: css({}),
  profile: {
    container: css({
      container: "",
      px: "$4",
      paddingBottom: "$4",
    }),
    content: css({}),
    avatar: css({}),
    name: css({
      order: "1",
    }),
    icon: css({
      borderRadius: "50%",
      order: "0",
    }),
    bio: css({}),
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
  return (
    <footer class={styles.footer()}>
      <div class={styles.profile.container()}>
        <Section
          level="1"
          heading={translate("profile:heading")}
          headingProps={{ fontSize: "2xl" }}
        >
          <Grid templateColumns="auto" gap="$4">
            <Grid
              templateColumns="auto auto"
              justifyContent="start"
              alignItems="center"
              gap="$4"
              css={{ marginTop: "$2" }}
            >
              <Text
                fontSize="xl"
                leading="none"
                fontWeight="bolder"
                class={styles.profile.name()}
              >
                {translate("profile:nameWithYomi")}
              </Text>
              <img
                src="/assets/v3/images/avatar.jpg"
                width="60"
                height="60"
                class={styles.profile.icon()}
              />
            </Grid>
            <div class={styles.profile.bio()}>
              <Text>
                {translate("profile:bio")}
              </Text>
            </div>

            <Section level="2" heading={translate("social:heading")}>
              <Grid templateColumns="auto 1fr" gap="$1 $2">
                {getSocialItems().map(({ label, name, uri }) => (
                  <Fragment>
                    <Text leading="none">{label}:</Text>
                    <Text leading="none">
                      <StyledExternalLink href={uri}>{name}</StyledExternalLink>
                    </Text>
                  </Fragment>
                ))}
              </Grid>
            </Section>
          </Grid>
        </Section>
      </div>

      <Copyright />
    </footer>
  );
}
