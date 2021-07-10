import type { FC } from 'react';

export const Emphasis: FC = ({ children }) => {
  return <em className="not-italic font-semibold">{children}</em>;
};
