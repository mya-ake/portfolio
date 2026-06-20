import { InternalLink } from "@shared/ui/link/InternalLink.tsx";
import { Logo } from "@shared/symbol/Logo.tsx";
import type { ComponentChildren } from "preact";

export type HeaderNavItem = {
  label: string;
  href: string;
  current: boolean;
};

type Props = {
  nav?: HeaderNavItem[];
  children?: ComponentChildren;
};

// Sub-page header (lower pages): editorial wordmark on the left, a small mono
// section nav on the right, above the breadcrumb row passed as children. The row
// wraps on narrow screens; the active nav item is shown in the primary text tone.
export function BasicHeader({ nav, children }: Props) {
  return (
    <header class="app-container px-4 pt-6">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <InternalLink
          href="/"
          class="block font-logo font-bold text-2xl tracking-[-0.02em] leading-none text-inherit no-underline"
        >
          <Logo />
        </InternalLink>
        {nav && nav.length > 0 && (
          <nav class="flex gap-[18px] font-mono text-xs">
            {nav.map(({ label, href, current }) => (
              <InternalLink
                key={href}
                href={href}
                class={current
                  ? "no-underline text-text"
                  : "no-underline text-muted"}
              >
                {label}
              </InternalLink>
            ))}
          </nav>
        )}
      </div>
      {children}
    </header>
  );
}
