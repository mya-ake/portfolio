import { describe, it, expect } from 'vitest';
import { decideExternalUrl } from './text.validators';

describe('decideExternalUrl', () => {
  it.each([
    ['http://example.com', true],
    ['https://example.com', true],
    ['/example-path', false],
  ])(`when input is '%s', result is '%s'`, (input, expected) => {
    const result = decideExternalUrl(input);
    expect(result).toBe(expected);
  });
});
