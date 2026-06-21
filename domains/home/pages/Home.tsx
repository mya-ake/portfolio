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
import { getSocialItems } from "@shared/profile/social.ts";
import type { PageProps } from "fresh";
import type { Data } from "./Home.handler.ts";

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
          <aside
            aria-label={translate("profile:heading")}
            class="flex items-center gap-3 rounded-xl border border-rule bg-surface p-3 md:block md:gap-0 md:rounded-none md:border-0 md:bg-transparent md:p-0"
          >
            <img
              src="/assets/v3/images/avatar.jpg"
              width="60"
              height="60"
              class="rounded-full shrink-0"
              alt=""
            />
            <div class="min-w-0 md:contents">
              <p class="font-logo text-base md:mt-4 md:text-xl">
                {translate("profile:nameWithYomi")}
              </p>
              <ul class="mt-1 flex flex-wrap gap-x-3 gap-y-1 list-none p-0 font-mono text-xs md:mt-6 md:grid md:gap-2">
                {socialItems.map(({ label, name, uri }) => (
                  <li
                    key={uri}
                    class="flex items-center md:justify-between md:gap-3 md:border-b md:border-hairline md:pb-[7px]"
                  >
                    <StyledExternalLink
                      href={uri}
                      class="md:hidden text-muted"
                    >
                      {label}
                    </StyledExternalLink>
                    <span class="hidden md:inline text-muted">{label}</span>
                    <StyledExternalLink
                      href={uri}
                      class="hidden md:inline text-link"
                    >
                      @{name}
                    </StyledExternalLink>
                  </li>
                ))}
              </ul>
            </div>
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
                      class="grid grid-cols-1 gap-1 md:grid-cols-[140px_1fr] md:gap-4 border-t border-hairline py-3"
                    >
                      <StyledExternalLink
                        href={html_url}
                        class="font-mono text-link text-sm"
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
