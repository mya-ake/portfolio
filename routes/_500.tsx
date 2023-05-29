import { SimpleAppShell } from "@shared/ui/app_shells/SimpleAppShell.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Heading } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { IconHead } from "@shared/head/IconHead.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { translate } from "@shared/i18n/mod.ts";

export default function InternalServerError() {
  return (
    <SimpleAppShell>
      <IconHead />
      <SEOHead
        description={translate("description:default")}
        path="/"
      />
      <Grid
        justifyContent="center"
        rowGap="$4"
        css={{ fontFamily: "'Red Hat Display', sans-serif", marginTop: "$16" }}
      >
        <Heading
          level="1"
          css={{ order: 2, textAlign: "center", fontSize: "$4xl" }}
        >
          Internal Server Error
        </Heading>
        <Text
          fontSize="6xl"
          leading="none"
          css={{ order: 1, textAlign: "center" }}
        >
          500
        </Text>
        <Text leading="none" css={{ order: 3, textAlign: "center" }}>
          <StyledInternalLink href="/">To Home</StyledInternalLink>
        </Text>
      </Grid>
    </SimpleAppShell>
  );
}
