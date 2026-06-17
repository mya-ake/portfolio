import { translate } from "@shared/i18n/mod.ts";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { StyledInternalLink } from "../../../link/StyledInternalLink.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import { PawMark } from "@shared/ui/icon/PawMark.tsx";
import { Copyright } from "./children/Copyright.tsx";
import type { WidgetMap } from "@shared/widget/mod.ts";

function getSocialItems(): { label: string; name: string; uri: string }[] {
  return [{
    label: translate("social:github"),
    name: translate("social:gitHubName"),
    uri: "https://github.com/mya-ake",
  }, {
    label: translate("social:x"),
    name: translate("social:xName"),
    uri: "https://twitter.com/mya_ake",
  }, {
    label: translate("social:zenn"),
    name: translate("social:zennName"),
    uri: "https://zenn.dev/mya_ake",
  }];
}

export type Props = {
  widgetMap: WidgetMap<"footer_bio">;
};

export function DefaultFooter(props: Props) {
  return (
    <footer class="bg-elevated">
      <div class="app-container px-4 py-12">
        <div class="grid gap-12 md:grid-cols-[200px_1fr_auto]">
          {/* Profile */}
          <section>
            <h2 class="eyebrow">{translate("profile:heading")}</h2>
            <div class="mt-4 flex items-center gap-4">
              <img
                src="/assets/v3/images/avatar.jpg"
                width="56"
                height="56"
                class="rounded-full"
                alt=""
              />
              <span class="font-logo text-xl">
                {translate("profile:nameWithYomi")}
              </span>
            </div>
            <div class="mt-4 text-muted text-[0.9375rem] leading-relaxed">
              <RenderHTML html={props.widgetMap.footer_bio} />
            </div>
          </section>

          {/* Social */}
          <section>
            <h2 class="eyebrow">{translate("social:heading")}</h2>
            <ul class="mt-4 grid gap-2 list-none p-0 max-w-[260px]">
              {getSocialItems().map(({ label, name, uri }) => (
                <li key={uri} class="flex justify-between gap-4">
                  <span class="text-faint">{label}</span>
                  <StyledExternalLink href={uri}>{name}</StyledExternalLink>
                </li>
              ))}
            </ul>
          </section>

          {/* Other Links */}
          <section>
            <h2 class="eyebrow">{translate("footer_links:heading")}</h2>
            <ul class="mt-4 grid gap-2 list-none p-0">
              <li>
                <StyledInternalLink href="/privacy_policy">
                  {translate("footer_links:privacy_policy")}
                </StyledInternalLink>
              </li>
            </ul>
          </section>
        </div>

        <div class="mt-12 flex items-center justify-between border-t border-rule pt-6">
          <div class="flex items-center gap-2.5">
            <PawMark size={22} class="text-accent" />
            <span class="font-mono text-faint text-[0.6875rem] tracking-[0.1em]">
              neko-note′
            </span>
          </div>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
