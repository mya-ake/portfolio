import type { FC } from 'react';

export const Underline: FC = ({ children }) => {
  return <u className="underline">{children}</u>;
};
