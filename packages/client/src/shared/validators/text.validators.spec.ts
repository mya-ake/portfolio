import { decideExternalUrl } from './text.validators';

describe('decideExternalUrl', () => {
  it.each`
    input                    | expected
    ${'http://example.com'}  | ${true}
    ${'https://example.com'} | ${true}
    ${'/example-path'}       | ${false}
  `(`result is '$expected' when input is '$input'`, ({ input, expected }) => {
    const result = decideExternalUrl(input);
    expect(result).toBe(expected);
  });
});
