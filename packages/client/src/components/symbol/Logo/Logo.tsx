import type { VFC } from 'react';

export const Logo: VFC = () => {
  return (
    <>
      <span className="logo">neko-note′</span>
      <style jsx>{`
        .logo {
          font-family: 'Red Hat Display', sans-serif;
        }
      `}</style>
    </>
  );
};
