/** @jsx h */
import { h } from "preact";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { HighlightJSHead } from "@shared/head/HighlightJSHead.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { Time } from "@shared/ui/text/Time.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import Highlight from "@islands/Highlight.tsx";
import type { PageProps } from "$fresh/server.ts";
import type { Data } from "./PostDetails.handler.ts";

export function PostDetails({ data }: PageProps<Data>) {
  return (
    <DefaultAppShell>
      <SEOHead
        title={data.post.title}
        description={data.post.description}
        path="/posts/"
      />
      <HighlightJSHead />
      <Box css={{ px: "$4" }}>
        <Section level="1" heading={data.post.title} isContainer>
          <Grid
            templateColumns="auto 1fr"
            columnGap="$2"
            css={{ marginTop: "$4" }}
          >
            <Text fontSize="sm">
              <Time
                datetime={data.post.publishedAt}
                displayFormat="YYYY.MM.DD"
              />
            </Text>
            {data.post.publishedAt !== data.post.updatedAt && (
              <Text fontSize="sm">
                (更新日:{" "}
                <Time
                  datetime={data.post.updatedAt}
                  displayFormat="YYYY.MM.DD"
                />)
              </Text>
            )}
          </Grid>
          <Box css={{ marginTop: "$8" }}>
            <RenderHTML html={data.post.body} />
          </Box>
        </Section>
      </Box>
      <Highlight />
    </DefaultAppShell>
  );
}
