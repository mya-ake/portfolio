/** @jsx h */
import { h } from "preact";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { HighlightJSHead } from "@shared/head/HighlightJSHead.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import { RenderBody } from "./children/RenderBody.tsx";
import Highlight from "@islands/Highlight.tsx";
import type { PageProps } from "$fresh/server.ts";

export function PostDetails({ data }: PageProps) {
  return (
    <DefaultAppShell>
      <SEOHead
        description=""
        path="/posts/"
      />
      <HighlightJSHead />
      <Box css={{ px: "$4" }}>
        <Section level="1" heading="Posts" isContainer>
          <Box css={{ marginTop: "$2" }}>
            <RenderBody html={data.post.body} />
          </Box>
        </Section>
      </Box>
      <Highlight />
    </DefaultAppShell>
  );
}
