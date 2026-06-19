import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { Time } from "@shared/ui/text/Time.tsx";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
import { translate } from "@shared/i18n/mod.ts";
import type { PageProps } from "fresh";
import type { Data } from "./Posts.handler.ts";
import { groupPostsByYear } from "./group_posts_by_year.ts";

export function Posts({ data }: PageProps<Data>) {
  const breadcrumbs = createBreadcrumbs({
    label: translate("posts:name"),
    to: "/posts",
  });
  const groups = groupPostsByYear(data.posts.contents);

  return (
    <DefaultAppShell
      widgetMap={data.widgetMap}
      breadcrumbs={breadcrumbs}
    >
      <SEOHead
        description=""
        path="/posts/"
      />
      <div class="app-container px-4">
        <h1 class="m-0 font-logo font-extrabold text-display tracking-[-0.035em] leading-none">
          {translate("posts:heading")}
        </h1>
        <p class="mt-3 font-mono text-muted text-xs">
          {translate("posts:total", { total: String(data.posts.totalCount) })}
        </p>

        <div class="mt-10">
          {groups.map(({ year, posts }) => (
            <div
              key={year}
              class="grid grid-cols-[auto_1fr] gap-8 border-t border-rule pt-3 pb-6 md:grid-cols-[120px_1fr]"
            >
              <div class="pt-1.5 font-mono text-[1.875rem] font-medium leading-none tracking-[-0.02em] text-faint">
                {year}
              </div>
              <ul class="m-0 list-none p-0">
                {posts.map(({ id, title, publishedAt }) => (
                  <li
                    key={id}
                    class="flex items-baseline gap-4 border-b border-hairline py-3"
                  >
                    <span class="shrink-0 basis-[52px] font-mono text-muted text-xs">
                      <Time datetime={publishedAt} displayFormat="MM.DD" />
                    </span>
                    <StyledInternalLink href={`/posts/${id}`}>
                      {title}
                    </StyledInternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DefaultAppShell>
  );
}
