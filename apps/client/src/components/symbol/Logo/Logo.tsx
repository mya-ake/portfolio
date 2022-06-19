import { css } from '@emotion/css';
import type { VFC } from 'react';

export const Logo: VFC = () => {
  return (
    <>
      <span className={logo}>neko-note′</span>
    </>
  );
};

const logo = css`
  font-family: 'Red Hat Display', sans-serif;
`;
