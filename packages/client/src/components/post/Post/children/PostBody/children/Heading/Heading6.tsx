import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';
import type { HeadingProps } from './type';

export const Heading6: FC<HeadingProps> = ({ children }) => {
  return <h6 className={clsx(baseHeading, 'text-lg')}>{children}</h6>;
};
