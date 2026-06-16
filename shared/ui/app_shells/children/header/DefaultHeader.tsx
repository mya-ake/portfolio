import { BasicHeader } from "./BasicHeader.tsx";
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
        <div class="flex items-end justify-between gap-6">
          <InternalLink
            href="/"
            class="block text-inherit no-underline text-masthead font-extrabold tracking-[-0.04em] leading-[0.9]"
          >
            <Logo />
          </InternalLink>
          <p class="m-0 shrink-0 text-right font-mono text-faint text-[0.6875rem] tracking-[0.16em] leading-[1.8]">
            Cat-loving<br />Web Engineer
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

  return (
    <BasicHeader>
      <div class="mt-4 border-y border-rule py-2">
        <Breadcrumbs items={props.breadcrumbs} />
      </div>
    </BasicHeader>
  );
}
