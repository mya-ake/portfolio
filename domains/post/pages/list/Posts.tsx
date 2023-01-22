/** @jsx h */
import { Fragment, h } from "preact";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { ListItem, UnorderList } from "@shared/ui/list/mod.ts";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import type { PageProps } from "$fresh/server.ts";
import type { Data } from "./Posts.handler.ts";

export function Posts({ data }: PageProps<Data>) {
  return (
    <DefaultAppShell>
      <SEOHead
        description=""
        path="/posts/"
      />
      <Section level="1" heading="Posts" isContainer>
        <Box css={{ marginTop: "$2" }}>
          <UnorderList>
            {data.posts.contents.map(({ id, title }) => (
              <Fragment key={id}>
                <ListItem>
                  <StyledInternalLink href={`/posts/${id}/`}>
                    {title}
                  </StyledInternalLink>
                </ListItem>
              </Fragment>
            ))}
          </UnorderList>
        </Box>
      </Section>
    </DefaultAppShell>
  );
}
