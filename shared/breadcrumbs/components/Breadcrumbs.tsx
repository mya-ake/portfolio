import { Section } from "@shared/ui/section/Section.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { translate } from "@shared/i18n/mod.ts";

export type BreadcrumbItem = {
  label: string;
  to: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs(props: Props) {
  const { items } = props;
  const tailItem = items.pop();
  return (
    <div class="px-4">
      <Section
        as="nav"
        level="1"
        heading={translate("breadcrumbs:heading")}
        headingProps={{ srOnly: true }}
        isContainer
      >
        <ol class="flex gap-x-2 gap-y-2 flex-wrap m-0 p-0 list-none">
          {items.map(({ label, to }) => (
            <li key={to} class="bc-link-item">
              <StyledInternalLink href={to}>{label}</StyledInternalLink>
            </li>
          ))}
          {tailItem && <li>{tailItem.label}</li>}
        </ol>
      </Section>
    </div>
  );
}
