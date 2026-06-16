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
        <InternalLink
          href="/"
          class="block text-inherit no-underline text-masthead leading-none"
        >
          <Logo />
        </InternalLink>
        <div class="masthead-rule mt-5" />
        <div class="eyebrow mt-3 flex justify-between">
          <span>EST. 2026</span>
          <span>Personal Site</span>
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
