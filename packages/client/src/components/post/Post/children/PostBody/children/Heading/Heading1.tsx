import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';
import type { HeadingProps } from './type';

export const Heading1: FC<HeadingProps> = ({ children }) => {
  return <h1 className={clsx(baseHeading, 'text-5xl')}>{children}</h1>;
};
