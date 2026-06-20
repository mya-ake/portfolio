import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { translate } from "@shared/i18n/mod.ts";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
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
      <div class="px-4">
        <article class="reading">
          <h1 class="m-0 font-logo font-extrabold text-h1 tracking-[-0.03em] leading-[1.05]">
            {translate("privacy_policy:heading")}
          </h1>
          <div class="mt-9 text-muted [&_p]:text-[0.9375rem] [&_p]:leading-[1.85]">
            <RenderHTML html={data.widgetMap.privacy_policy} />
          </div>
        </article>
      </div>
    </DefaultAppShell>
  );
}
