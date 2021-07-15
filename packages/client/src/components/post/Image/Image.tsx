import NextImage from 'next/image';
import type { VFC } from 'react';

export type ImageProps = {
  src: string;
  alt: string;
  height?: string;
};

export const Image: VFC<ImageProps> = ({ src, alt, height = '200' }) => {
  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <NextImage src={src} alt={alt} layout="fill" className="object-contain" />
    </div>
  );
};
