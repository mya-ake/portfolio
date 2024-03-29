import { Fragment } from "preact";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Time } from "@shared/ui/text/Time.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";
import { translate } from "@shared/i18n/mod.ts";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Data } from "./Home.handler.ts";

export function Home({ data }: PageProps<Data>) {
  return (
    <DefaultAppShell
      widgetMap={data.widgetMap}
      breadcrumbs={createBreadcrumbs()}
    >
      <SEOHead
        description={translate("description:default")}
        path="/"
      />
      <Box css={{ px: "$4" }}>
        <Section
          level="1"
          heading={translate("home:heading")}
          headingProps={{ srOnly: true }}
          isContainer
        >
          <Grid templateColumns="auto" rowGap="$12">
            <Section level="2" heading={"About"}>
              <Box css={{ marginTop: "$2" }}>
                <RenderHTML html={data.widgetMap.home_about} />
              </Box>
            </Section>

            <Section level="2" heading={"Posts"}>
              <Box css={{ marginTop: "$2" }}>
                <UnorderList>
                  {data.posts.contents.map(({ id, title, publishedAt }) => (
                    <Fragment key={id}>
                      <ListItem>
                        <Time
                          datetime={publishedAt}
                          displayFormat="YYYY.MM.DD"
                        />{" "}
                        <StyledInternalLink href={`/posts/${id}`}>
                          {title}
                        </StyledInternalLink>
                      </ListItem>
                    </Fragment>
                  ))}
                </UnorderList>
              </Box>
              <Box css={{ marginTop: "$4" }}>
                <StyledInternalLink href="/posts">
                  一覧へ
                </StyledInternalLink>
              </Box>
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
      </Box>
    </DefaultAppShell>
  );
}
