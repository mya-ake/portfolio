import { DefaultHeader } from '../DefaultHeader';
import { DefaultFooter } from '../DefaultFooter';
import type { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div className="min-h-screen overflow-auto flex flex-col bg-gray-50 text-gray-800">
      <div>
        <DefaultHeader />
      </div>
      <main className="container mx-auto">{children}</main>
      <div className="mt-auto">
        <DefaultFooter />
      </div>
    </div>
  );
};
