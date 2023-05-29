import { CSS, css } from "@shared/styles/css.ts";

const styles = {
  logo: css({
    fontFamily: "'Red Hat Display', sans-serif",
  }),
};

type Porps = {
  css?: CSS;
};

export function Logo(props: Porps) {
  return (
    <span
      class={styles.logo({
        css: props.css,
      })}
    >
      neko-note′
    </span>
  );
}
