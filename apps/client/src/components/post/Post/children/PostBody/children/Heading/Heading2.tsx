import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';
import type { HeadingProps } from './type';

export const Heading2: FC<HeadingProps> = ({ children }) => {
  return <h2 className={clsx(baseHeading, 'text-4xl')}>{children}</h2>;
};
