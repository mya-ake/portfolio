import { BasicHeader, type HeaderNavItem } from "./BasicHeader.tsx";
import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import { Logo } from "@shared/symbol/Logo.tsx";
import { shouldShowMasthead } from "./should_show_masthead.ts";
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@shared/breadcrumbs/components/Breadcrumbs.tsx";

type Props = {
  breadcrumbs: BreadcrumbItem[];
};

export function DefaultHeader(props: Props) {
  // Home gets the editorial masthead; lower pages get a small wordmark plus
  // breadcrumbs. Home is the only page whose breadcrumbs are just the home crumb.
  if (shouldShowMasthead(props.breadcrumbs)) {
    return (
      <header class="app-container px-4 pt-10">
        <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <InternalLink
            href="/"
            class="block text-inherit no-underline text-masthead font-extrabold tracking-[-0.04em] leading-[0.9]"
          >
            <Logo />
          </InternalLink>
          <p class="m-0 shrink-0 text-right font-mono text-muted text-[0.6875rem] tracking-[0.16em] leading-[1.8]">
            Notes on Code<br />& Curiosity
          </p>
        </div>
        <div class="masthead-rule mt-[1.375rem]" />
        <div class="eyebrow mt-1 flex justify-between">
          <span>EST. 2026</span>
          <span>
            Personal Site — <span class="normal-case">mya-ake</span>
          </span>
        </div>
      </header>
    );
  }

  // The section nav highlights "Posts" whenever the breadcrumb trail passes
  // through /posts (the list and every article); Home is never current here
  // because Home renders the masthead instead.
  const isPostsSection = props.breadcrumbs.some((item) => item.to === "/posts");
  const nav: HeaderNavItem[] = [
    { label: "Home", href: "/", current: false },
    { label: "Posts", href: "/posts", current: isPostsSection },
  ];

  return (
    <BasicHeader nav={nav}>
      <div class="mt-4 border-y border-rule py-2">
        <Breadcrumbs items={props.breadcrumbs} />
      </div>
    </BasicHeader>
  );
}
