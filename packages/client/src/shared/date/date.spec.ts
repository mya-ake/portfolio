import { describe, it, expect } from 'vitest';
import { createDayjs } from './date';

describe('createDayjs', () => {
  it.each([
    [new Date('2021-07-01'), '2021'],
    [new Date('2021-07-01').getTime(), '2021'],
    [String(new Date('2021-07-01').getTime() / 1000), '2021'],
  ])('input: %s / expected year: %s', (input, expected) => {
    const result = createDayjs(input).get('year').toString();
    expect(result).toBe(expected);
  });
});
