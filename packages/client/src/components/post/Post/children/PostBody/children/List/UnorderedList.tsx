import type { FC } from 'react';

export const UnorderedList: FC = ({ children }) => {
  return <ul className="ml-4 list-disc list-inside">{children}</ul>;
};
