import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";

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
    <nav>
      <ol>
        {items.map(({ label, to }) => (
          <li key={to}>
            <StyledInternalLink href={to}>{label}</StyledInternalLink>
          </li>
        ))}
        {tailItem && <li>{tailItem.label}</li>}
      </ol>
    </nav>
  );
}
