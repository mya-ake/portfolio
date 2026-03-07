import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { translate } from "@shared/i18n/mod.ts";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
import { Box } from "@shared/ui/layout/Box.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import type { PageProps } from "fresh";
import type { Data } from "./PrivacyPolicy.handler.ts";

export function PrivacyPolicy({ data, route }: PageProps<Data>) {
  const path = route ?? "/privacy_policy";
  return (
    <DefaultAppShell
      widgetMap={data.widgetMap}
      breadcrumbs={createBreadcrumbs({
        label: translate("privacy_policy:name"),
        to: path,
      })}
    >
      <SEOHead
        title={translate("privacy_policy:name")}
        description={translate("description:default")}
        path={path}
      />
      <Box css={{ px: "$4" }}>
        <Section
          level="1"
          heading={translate("privacy_policy:heading")}
          isContainer
        >
          <Box css={{ marginTop: "$4" }}>
            <RenderHTML html={data.widgetMap.privacy_policy} />
          </Box>
        </Section>
      </Box>
    </DefaultAppShell>
  );
}
