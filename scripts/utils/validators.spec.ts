import * as validators from './validators';

describe('scripts/utils/validators', () => {
  describe('truthyProperties function', () => {
    const { truthyProperties } = validators;

    it('all property is truthy', () => {
      const result = truthyProperties({
        a: 'a',
        b: 'b',
      });
      expect(result).toBe(true);
    });

    it('one property is undefined', () => {
      const result = truthyProperties({
        a: 'a',
        b: undefined,
      });
      expect(result).toBe(false);
    });
  });
});
