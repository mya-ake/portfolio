import { DefaultHeader } from '../DefaultHeader';
import { DefaultFooter } from '../DefaultFooter';
import type { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div className="min-h-screen overflow-auto layout bg-gray-50 text-gray-800">
      <div>
        <DefaultHeader />
      </div>
      <main className="container h-full mx-auto">{children}</main>
      <div className="mt-auto">
        <DefaultFooter />
      </div>
      <style jsx>
        {`
          .layout {
            display: grid;
            grid-template-rows: auto 1fr auto;
          }
        `}
      </style>
    </div>
  );
};
