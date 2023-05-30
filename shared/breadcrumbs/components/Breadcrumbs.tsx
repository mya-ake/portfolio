import { Box } from "@shared/ui/layout/Box.tsx";
import { Section } from "@shared/ui/section/Section.tsx";
import { StyledInternalLink } from "@shared/ui/link/StyledInternalLink.tsx";
import { translate } from "@shared/i18n/mod.ts";
import { css } from "@shared/styles/css.ts";

export type BreadcrumbItem = {
  label: string;
  to: string;
};

type Props = {
  items: BreadcrumbItem[];
};

const styles = {
  list: css({
    display: "flex",
    columnGap: "$2",
    rowGap: "$2",
    flexWrap: "wrap",
    margin: "0",
    padding: "0",
    listStyle: "none",
  }),
  linkItem: css({
    "&::after": {
      content: ">",
      paddingLeft: "$2",
    },
  }),
  textItem: css({}),
};

export function Breadcrumbs(props: Props) {
  const { items } = props;
  const tailItem = items.pop();
  return (
    <Box css={{ px: "$4" }}>
      <Section
        as="nav"
        level="1"
        heading={translate("breadcrumbs:heading")}
        headingProps={{ srOnly: true }}
        isContainer
      >
        <ol class={styles.list()}>
          {items.map(({ label, to }) => (
            <li key={to} class={styles.linkItem()}>
              <StyledInternalLink href={to}>{label}</StyledInternalLink>
            </li>
          ))}
          {tailItem && <li class={styles.textItem()}>{tailItem.label}</li>}
        </ol>
      </Section>
    </Box>
  );
}
