import { css } from '@emotion/css';
import type { FC } from 'react';

export const CodePresenter: FC = ({ children }) => {
  return (
    <pre className={code}>
      <code>{children}</code>
    </pre>
  );
};

const code = css`
  overflow-x: auto;
  pointer-events: auto;

  .hljs {
    display: block;
    padding: 0.5rem 1rem;
  }
`;
