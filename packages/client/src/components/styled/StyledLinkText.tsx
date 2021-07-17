import type { FC } from 'react';

export const StyledLinkText: FC = ({ children }) => {
  return <span className="text-blue-400 underline">{children}</span>;
};
