import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { Heading } from "@shared/ui/text/Heading.tsx";
import { Time } from "@shared/ui/text/Time.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import { StyledExternalLink } from "@shared/ui/link/StyledExternalLink.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { translate } from "@shared/i18n/mod.ts";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
import type { PageProps } from "fresh";
import type { Data } from "./Home.handler.ts";

// Same source as the footer colophon; kept local until a shared profile resource
// is extracted (follow-up — see DefaultFooter.getSocialItems).
function getSocialItems(): { label: string; name: string; uri: string }[] {
  return [
    {
      label: translate("social:github"),
      name: translate("social:gitHubName"),
      uri: "https://github.com/mya-ake",
    },
    {
      label: translate("social:x"),
      name: translate("social:xName"),
      uri: "https://twitter.com/mya_ake",
    },
    {
      label: translate("social:zenn"),
      name: translate("social:zennName"),
      uri: "https://zenn.dev/mya_ake",
    },
  ];
}

export function Home({ data }: PageProps<Data>) {
  const socialItems = getSocialItems();

  return (
    <DefaultAppShell
      widgetMap={data.widgetMap}
      breadcrumbs={createBreadcrumbs()}
    >
      <SEOHead
        description={translate("description:default")}
        path="/"
      />
      <div class="app-container px-4">
        <Heading level="1" srOnly>{translate("home:heading")}</Heading>

        <div class="grid gap-12 md:grid-cols-[200px_1fr]">
          {/* Left rail — profile + social */}
          <aside aria-label={translate("profile:heading")}>
            <img
              src="/assets/v3/images/avatar.jpg"
              width="60"
              height="60"
              class="rounded-full"
              alt=""
            />
            <p class="mt-4 font-logo text-xl">
              {translate("profile:nameWithYomi")}
            </p>
            <ul class="mt-6 grid gap-2 list-none p-0 font-mono text-[0.78rem]">
              {socialItems.map(({ label, name, uri }) => (
                <li
                  key={uri}
                  class="flex justify-between gap-3 border-b border-hairline pb-[7px]"
                >
                  <span class="text-muted">{label}</span>
                  <StyledExternalLink href={uri}>@{name}</StyledExternalLink>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right column — numbered editorial index */}
          <div class="grid gap-section">
            <section>
              <h2 class="eyebrow mb-3">01 — About</h2>
              <div class="text-code leading-[1.9]">
                <RenderHTML html={data.widgetMap.home_about} />
              </div>
            </section>

            <section>
              <h2 class="eyebrow mb-3">02 — Posts</h2>
              <ol class="m-0 list-none p-0">
                {data.posts.contents.map(
                  ({ id, title, publishedAt }, index) => (
                    <li key={id} class="toc-row">
                      <span class="font-mono text-muted text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <StyledInternalLink href={`/posts/${id}`}>
                        {title}
                      </StyledInternalLink>
                      <span class="toc-lead" aria-hidden="true" />
                      <span class="shrink-0 font-mono text-muted text-xs">
                        <Time
                          datetime={publishedAt}
                          displayFormat="YYYY.MM.DD"
                        />
                      </span>
                    </li>
                  ),
                )}
              </ol>
              <InternalLink
                href="/posts"
                class="mt-4 inline-block font-mono text-accent text-[0.8125rem] no-underline"
              >
                記事一覧へ →
              </InternalLink>
            </section>

            <section>
              <h2 class="eyebrow mb-3">03 — Recent Activities</h2>
              <div class="text-code leading-[1.7]">
                <RenderHTML html={data.widgetMap.home_recent_activities} />
              </div>
            </section>

            <section>
              <h2 class="eyebrow mb-3">04 — GitHub</h2>
              <ul class="m-0 list-none p-0">
                {data.repositories.map(
                  ({ id, name, html_url, description }) => (
                    <li
                      key={id}
                      class="grid grid-cols-[140px_1fr] gap-4 border-t border-hairline py-3"
                    >
                      <StyledExternalLink
                        href={html_url}
                        class="font-mono text-link text-[0.84rem]"
                      >
                        {name}
                      </StyledExternalLink>
                      <span class="text-muted text-sm leading-snug">
                        {description}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </DefaultAppShell>
  );
}
