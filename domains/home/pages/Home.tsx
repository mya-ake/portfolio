/** @jsx h */
import { Fragment, h } from "preact";
import { css } from "@shared/styles/css.ts";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";
import { translate } from "@shared/i18n/mod.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Data } from "./Home.handler.ts";

const styles = {
  container: css({
    container: "",
    px: "$4",
  }),
};

export function Home({ data }: PageProps<Data>) {
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
              手早く作るためにNext.js/GraphQLで作っていたのを止めて、<StyledExternalLink href="https://fresh.deno.dev/">
                Fresh
              </StyledExternalLink>で改めて作り直し中。
            </Text>

            <Section level="3" heading={"Current Status"}>
              <Grid templateColumns="auto 1fr" columnGap="$2">
                <Text>Home:</Text>
                <Text>Fresh</Text>
                <Text>Blog:</Text>
                <Text>Nuxt.js v2</Text>
                <Text>Other:</Text>
                <Text>Vue.js v2</Text>
              </Grid>
            </Section>
          </Section>

          <Section level="2" heading={"Recent Activities"}>
            <UnorderList>
              <ListItem>
                <StyledExternalLink href="https://zenn.dev/mya_ake/articles/5517a5001db48e">
                  Reactのchildrenの型で子コンポーネントを制御する（したかった）
                </StyledExternalLink>
              </ListItem>
            </UnorderList>
          </Section>

          <Section level="2" heading={"GitHub Activities"}>
            <UnorderList>
              {data.repositories.map(({ id, name, html_url, description }) => (
                <Fragment key={id}>
                  <ListItem>
                    <StyledExternalLink href={html_url}>
                      {name}
                    </StyledExternalLink>
                    <span>: {description}</span>
                  </ListItem>
                </Fragment>
              ))}
            </UnorderList>
          </Section>
        </Grid>
      </Section>
    </DefaultAppShell>
  );
}
