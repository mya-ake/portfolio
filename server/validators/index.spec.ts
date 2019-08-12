import * as validators from './index';

describe('server/validators', () => {
  describe('isEmptyString function', () => {
    const { isEmptyString } = validators;

    it.each`
      input  | expected
      ${'a'} | ${false}
      ${' '} | ${false}
      ${''}  | ${true}
    `('returns $expected when input is $input', ({ input, expected }) => {
      const result = isEmptyString(input);
      expect(result).toBe(expected);
    });
  });

  describe('isEmptyStringWithTrim function', () => {
    const { isEmptyStringWithTrim } = validators;

    it.each`
      input  | expected
      ${'a'} | ${false}
      ${' '} | ${true}
      ${''}  | ${true}
    `('returns $expected when input is $input', ({ input, expected }) => {
      const result = isEmptyStringWithTrim(input);
      expect(result).toBe(expected);
    });
  });

  describe('hasExtension function', () => {
    const { hasExtension } = validators;

    it.each`
      input      | expected
      ${'about'} | ${false}
      ${'sw.js'} | ${true}
    `('returns $expected when input is $input', ({ input, expected }) => {
      const result = hasExtension(input);
      expect(result).toBe(expected);
    });
  });
});
