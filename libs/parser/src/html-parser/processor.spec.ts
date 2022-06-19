import { describe, it, expect } from 'vitest';
import { removeBackslashOfHTMLAttribute } from './processor';

describe('removeBackslashOfHTMLAttribute', () => {
  it('has backslash at attributes', () => {
    const result = removeBackslashOfHTMLAttribute(
      `<a href=\\"https://example.com\\" rel=\\"noopener noreferrer\\">https://example.com</a>`,
    );
    expect(result).toBe(
      `<a href="https://example.com" rel="noopener noreferrer">https://example.com</a>`,
    );
  });

  it('has backslash in content', () => {
    const result = removeBackslashOfHTMLAttribute(
      `<a href=\\"https://example.com\\" rel=\\"noopener noreferrer\\">\\</a>`,
    );
    expect(result).toBe(
      `<a href="https://example.com" rel="noopener noreferrer">\\</a>`,
    );
  });
});
