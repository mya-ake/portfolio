/** @jsx h */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { css } from "@shared/styles/css.ts";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";
import { translate } from "@shared/i18n/mod.ts";
import { SEOHead } from "@shared/head/SEOHead.tsx";
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
      <SEOHead
        description={translate("description:default")}
        path="/"
      />
      <Section
        level="1"
        heading={translate("home:heading")}
        headingProps={{ srOnly: true }}
        class={styles.container()}
      >
        <Grid templateColumns="auto" gap="$8">
          <Section level="2" heading={"About"}>
            <Box css={{ marginTop: "$2" }}>
              <Text>
                猫好きのwebエンジニアが気まぐれで運営してるサイトです。リニューアルしようとしてますが、ずっと完成してないです。
              </Text>
              <Text>
                手早く作るためにNext.js/GraphQLで作っていたのを止めて、<StyledExternalLink href="https://fresh.deno.dev/">
                  Fresh
                </StyledExternalLink>で改めて作り直し中。
              </Text>
              <Text>
                数年前の記事やスライドは移行が大変&情報として古いので削除する予定です。再度見たいものがあれば書き直したりするので、Twitterのアカウントまでご連絡ください。
              </Text>
            </Box>

            <Section
              level="3"
              heading={"Current Status"}
              css={{ marginTop: "$4" }}
            >
              <Grid
                templateColumns="auto 1fr"
                columnGap="$2"
                css={{ marginTop: "$2" }}
              >
                <Text fontWeight={"bolder"}>Home:</Text>
                <Text>Fresh</Text>
                <Text fontWeight={"bolder"}>Blog:</Text>
                <Text>Nuxt.js v2</Text>
                <Text fontWeight={"bolder"}>Other:</Text>
                <Text>Vue.js v2</Text>
              </Grid>
            </Section>
          </Section>

          <Section level="2" heading={"Recent Activities"}>
            <Box css={{ marginTop: "$2" }}>
              <UnorderList>
                <ListItem>
                  <StyledExternalLink href="https://zenn.dev/mya_ake/articles/5517a5001db48e">
                    Reactのchildrenの型で子コンポーネントを制御する（したかった）
                  </StyledExternalLink>
                </ListItem>
                <ListItem>
                  <StyledExternalLink href="https://speakerdeck.com/myaake/fu-gang-falsecxptimufalseshao-jie-tokai-fa-falsegong-fu">
                    福岡のCXPチームの紹介と開発の工夫
                  </StyledExternalLink>
                </ListItem>
              </UnorderList>
            </Box>
          </Section>

          <Section level="2" heading={"GitHub Activities"}>
            <Box css={{ marginTop: "$2" }}>
              <UnorderList>
                {data.repositories.map((
                  { id, name, html_url, description },
                ) => (
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
            </Box>
          </Section>
        </Grid>
      </Section>
    </DefaultAppShell>
  );
}
