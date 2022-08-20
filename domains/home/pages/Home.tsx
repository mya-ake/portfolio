/** @jsx h */
import { h } from "preact";
import { css } from "@shared/styles/css.ts";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { translate } from "@shared/i18n/mod.ts";

const styles = {
  container: css({
    container: "",
    px: "$4",
  }),
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
        <Grid templateColumns="auto" gap="$8">
          <Section level="2" heading={"About"}>
            <Text>
              猫好きのwebエンジニアが気まぐれで運営してるサイトです。リニューアルしようとしてますが、ずっと完成してないです。
            </Text>
            <Text>
              手早く作るためにNext.js/GraphQLで作っていたの止めて、<StyledExternalLink href="https://fresh.deno.dev/">
                Fresh
              </StyledExternalLink>で改めて作り直し中。
            </Text>

            <Section level="3" heading={"Status"}>
            </Section>
          </Section>

          <Section level="2" heading={"Recent Activities"}>
          </Section>

          <Section level="2" heading={"GitHub Activities"}>
          </Section>
        </Grid>
      </Section>
    </DefaultAppShell>
  );
}
