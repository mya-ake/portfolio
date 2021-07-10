import { render } from '@testing-library/react';
import { AutoSwitchLink } from './AutoSwitchLink';

describe('different components depending on href', () => {
  it('InternalLink is rendered', () => {
    const { getByText } = render(
      <AutoSwitchLink href="/posts">to Posts</AutoSwitchLink>,
    );
    const el = getByText('to Posts');
    expect(el.hasAttribute('rel')).toBe(false);
    expect(el.hasAttribute('target')).toBe(false);
  });

  it('ExternalLink is rendered', () => {
    const { getByText } = render(
      <AutoSwitchLink href="https://example.com/posts">
        to Posts
      </AutoSwitchLink>,
    );
    const el = getByText('to Posts');
    expect(el.hasAttribute('rel')).toBe(true);
    expect(el.hasAttribute('target')).toBe(true);
  });
});
