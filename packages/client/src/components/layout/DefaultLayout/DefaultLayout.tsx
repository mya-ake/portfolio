import { css } from '@emotion/css';
import { DefaultHeader } from '../DefaultHeader';
import { DefaultFooter } from '../DefaultFooter';
import type { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div className={`${layout} min-h-screen overflow-auto`}>
      <div>
        <DefaultHeader />
      </div>
      <main className="container h-full mx-auto">{children}</main>
      <div>
        <DefaultFooter />
      </div>
    </div>
  );
};

const layout = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;
