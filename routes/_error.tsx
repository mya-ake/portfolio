import { HttpError, page } from "fresh";
import type { Context, PageProps } from "fresh";
import { SimpleAppShell } from "@shared/ui/app_shells/SimpleAppShell.tsx";
import { Grid } from "@shared/ui/layout/Grid.tsx";
import { Heading } from "@shared/ui/text/Heading.tsx";
import { Text } from "@shared/ui/text/Text.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { IconHead } from "@shared/head/IconHead.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { translate } from "@shared/i18n/mod.ts";

const DEFAULT_STATUS = 500;

const STATUS_TITLES: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

type Data = { statusCode: number; title: string };

export const handler = {
  GET(ctx: Context<Data>) {
    const statusCode = ctx.error instanceof HttpError
      ? ctx.error.status
      : DEFAULT_STATUS;
    const title = STATUS_TITLES[statusCode] ?? STATUS_TITLES[DEFAULT_STATUS];
    return page<Data>({ statusCode, title }, { status: statusCode });
  },
};

export default function ErrorPage({ data }: PageProps<Data>) {
  const { statusCode, title } = data;

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
