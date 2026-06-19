import { DefaultAppShell } from "@shared/ui/app_shells/DefaultAppShell.tsx";
import { SEOHead } from "@shared/head/SEOHead.tsx";
import { HighlightJSHead } from "@shared/head/HighlightJSHead.tsx";
import { Heading } from "@shared/ui/text/Heading.tsx";
import { Time } from "@shared/ui/text/Time.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import { RenderHTML } from "@shared/render/RenderHTML.tsx";
import Highlight from "@islands/Highlight.tsx";
import { isSameDate } from "@shared/date/is_same_date.ts";
import { createBreadcrumbs } from "@shared/breadcrumbs/manager.ts";
import { translate } from "@shared/i18n/mod.ts";
import type { PageProps } from "fresh";
import type { Data } from "./PostDetails.handler.ts";

export function PostDetails({ data }: PageProps<Data>) {
  const { post } = data;
  const breadcrumbs = createBreadcrumbs({
    label: translate("posts:name"),
    to: "/posts",
  }, {
    label: post.title,
    to: `/posts/${post.id}`,
  });
  const isUpdated = !isSameDate(post.publishedAt, post.updatedAt);

  return (
    <DefaultAppShell
      widgetMap={data.widgetMap}
      breadcrumbs={breadcrumbs}
    >
      <SEOHead
        title={post.title}
        description={post.description}
        path="/posts/"
      />
      <HighlightJSHead />
      <div class="px-4">
        <article class="reading">
          <header>
            <p class="m-0 font-mono text-accent text-xs tracking-[0.1em]">
              <Time datetime={post.publishedAt} displayFormat="YYYY.MM.DD" />
            </p>
            <Heading
              level="1"
              class="mt-3.5 tracking-[-0.03em] leading-[1.2]"
            >
              {post.title}
            </Heading>
            {post.tags.length > 0 && (
              <ul class="mt-[18px] flex flex-wrap gap-2 m-0 p-0 list-none">
                {post.tags.map((tag) => (
                  <li key={tag.id}>
                    <span class="font-mono text-muted text-[0.6875rem] border border-border rounded-full px-[11px] py-[3px]">
                      {tag.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div class="my-8 h-px bg-rule" />

          <div class="text-code [&_p]:text-[1.0625rem] [&_p]:leading-[1.95]">
            <RenderHTML html={post.body} />
          </div>

          <footer class="mt-10 flex items-center justify-between border-t border-rule pt-6 font-mono text-xs">
            {isUpdated
              ? (
                <span class="text-muted">
                  {translate("immutable:updatedDate")}{" "}
                  <Time datetime={post.updatedAt} displayFormat="YYYY.MM.DD" />
                </span>
              )
              : <span />}
            <InternalLink href="/posts" class="text-accent no-underline">
              ← 記事一覧へ
            </InternalLink>
          </footer>
        </article>
      </div>
      <Highlight />
    </DefaultAppShell>
  );
}
