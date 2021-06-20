import type { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div className="min-h-screen overflow-auto">
      <main className="container mx-auto">{children}</main>
    </div>
  );
};
