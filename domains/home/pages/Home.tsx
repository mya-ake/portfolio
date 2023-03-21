/** @jsx h */
import { Fragment, h } from "preact";
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
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import type { PageProps } from "$fresh/server.ts";
import type { Data } from "./Home.handler.ts";

const styles = {
  container: css({
    px: "$4",
  }),
};

export function Home({ data }: PageProps<Data>) {
  return (
    <DefaultAppShell widgetMap={data.widgetMap}>
      <SEOHead
        description={translate("description:default")}
        path="/"
      />
      <Section
        level="1"
        heading={translate("home:heading")}
        headingProps={{ srOnly: true }}
        class={styles.container()}
        isContainer
      >
        <Grid templateColumns="auto" rowGap="$12">
          <Section level="2" heading={"About"}>
            <Box css={{ marginTop: "$2" }}>
              <RenderHTML html={data.widgetMap.home_about} />
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
              <RenderHTML html={data.widgetMap.home_recent_activities} />
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
