import { Fragment } from "preact";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { Time } from "@shared/ui/text/Time.tsx";
import { isSameDate } from "@shared/date/is_same_date.ts";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
import { translate } from "@shared/i18n/mod.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Data } from "./Posts.handler.ts";

export function Posts({ data }: PageProps<Data>) {
  const breadcrumbs = createBreadcrumbs({
    label: translate("posts:name"),
    to: "/posts",
  });

  return (
    <DefaultAppShell
      widgetMap={data.widgetMap}
      breadcrumbs={breadcrumbs}
    >
      <SEOHead
        description=""
        path="/posts/"
      />
      <Box css={{ px: "$4" }}>
        <Section level="1" heading={translate("posts:heading")} isContainer>
          <Box css={{ marginTop: "$2" }}>
            <UnorderList>
              {data.posts.contents.map((
                { id, title, publishedAt, updatedAt, tags },
              ) => (
                <Fragment key={id}>
                  <ListItem>
                    <StyledInternalLink href={`/posts/${id}`}>
                      {title}
                    </StyledInternalLink>
                    <Grid templateColumns="auto 1fr" columnGap="$2">
                      <Text fontSize="sm">
                        <Time
                          datetime={publishedAt}
                          displayFormat="YYYY.MM.DD"
                        />
                      </Text>
                      {!isSameDate(publishedAt, updatedAt) && (
                        <Text fontSize="sm">
                          ({translate("immutable:updatedDate")}:{" "}
                          <Time
                            datetime={updatedAt}
                            displayFormat="YYYY.MM.DD"
                          />)
                        </Text>
                      )}
                    </Grid>
                  </ListItem>
                </Fragment>
              ))}
            </UnorderList>
          </Box>
        </Section>
      </Box>
    </DefaultAppShell>
  );
}
