/** @jsx h */
import { h } from "preact";
import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { Box } from "@shared/ui/layout/Box.tsx";
import type { PageProps } from "$fresh/server.ts";

export function PostDetails({ data }: PageProps) {
  return (
    <DefaultAppShell>
      <SEOHead
        description=""
        path="/posts/"
      />
      <Box css={{ px: "$4" }}>
        <Section level="1" heading="Posts" isContainer>
          <Box css={{ marginTop: "$2" }}>
          </Box>
        </Section>
      </Box>
    </DefaultAppShell>
  );
}
