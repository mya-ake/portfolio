import { HttpError } from "fresh";
import type { PageProps } from "fresh";
import { SimpleAppShell } from "@shared/ui/app_shells/SimpleAppShell.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Heading } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { IconHead } from "@shared/head/IconHead.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { translate } from "@shared/i18n/mod.ts";

export default function ErrorPage(props: PageProps) {
  const is404 = props.error instanceof HttpError && props.error.status === 404;
  const statusCode = is404 ? 404 : 500;
  const title = is404 ? "Not Found" : "Internal Server Error";

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
          {title}
        </Heading>
        <Text
          fontSize="6xl"
          leading="none"
          css={{ order: 1, textAlign: "center" }}
        >
          {statusCode}
        </Text>
        <Text leading="none" css={{ order: 3, textAlign: "center" }}>
          <StyledInternalLink href="/">To Home</StyledInternalLink>
        </Text>
      </Grid>
    </SimpleAppShell>
  );
}
