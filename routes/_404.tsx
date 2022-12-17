/** @jsx h */
import { h } from "preact";
import { SimpleAppShell } from "@shared/ui/app_shells/SimpleAppShell.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Heading } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";

export default function NotFound() {
  return (
    <SimpleAppShell>
      <Grid
        justifyContent="center"
        rowGap="$4"
        css={{ fontFamily: "'Red Hat Display', sans-serif", marginTop: "$16" }}
      >
        <Heading
          level="1"
          css={{ order: 2, textAlign: "center", fontSize: "$4xl" }}
        >
          Not Found
        </Heading>
        <Text
          fontSize="6xl"
          leading="none"
          css={{ order: 1, textAlign: "center" }}
        >
          404
        </Text>
        <Text leading="none" css={{ order: 3, textAlign: "center" }}>
          <StyledInternalLink href="/">To Home</StyledInternalLink>
        </Text>
      </Grid>
    </SimpleAppShell>
  );
}
