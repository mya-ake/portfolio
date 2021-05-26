import { hasNextPage, hasPreviousPage } from './pagination';

describe('hasNextPage', () => {
  it.each`
    input                                     | length | expected
    ${{ first: 10 }}                          | ${11}  | ${true}
    ${{ first: 10, after: 'after cursor' }}   | ${11}  | ${true}
    ${{ last: 10 }}                           | ${11}  | ${false}
    ${{ last: 10, before: 'before cursror' }} | ${11}  | ${true}
    ${{ first: 10 }}                          | ${10}  | ${false}
    ${{ first: 10, after: 'after cursor' }}   | ${10}  | ${false}
    ${{ last: 10 }}                           | ${10}  | ${false}
    ${{ last: 10, before: 'before cursror' }} | ${10}  | ${true}
    ${{ first: 10 }}                          | ${9}   | ${false}
    ${{ first: 10, after: 'after cursor' }}   | ${9}   | ${false}
    ${{ last: 10 }}                           | ${9}   | ${false}
    ${{ last: 10, before: 'before cursror' }} | ${9}   | ${true}
  `(
    'result is $expected when $input, $length',
    ({ input, length, expected }) => {
      const result = hasNextPage(input, length);
      expect(result).toBe(expected);
    },
  );
});

describe('hasPreviousPage', () => {
  it.each`
    input                                     | length | expected
    ${{ first: 10 }}                          | ${11}  | ${false}
    ${{ first: 10, after: 'after cursor' }}   | ${11}  | ${true}
    ${{ last: 10 }}                           | ${11}  | ${true}
    ${{ last: 10, before: 'before cursror' }} | ${11}  | ${true}
    ${{ first: 10 }}                          | ${10}  | ${false}
    ${{ first: 10, after: 'after cursor' }}   | ${10}  | ${true}
    ${{ last: 10 }}                           | ${10}  | ${false}
    ${{ last: 10, before: 'before cursror' }} | ${10}  | ${false}
    ${{ first: 10 }}                          | ${9}   | ${false}
    ${{ first: 10, after: 'after cursor' }}   | ${9}   | ${true}
    ${{ last: 10 }}                           | ${9}   | ${false}
    ${{ last: 10, before: 'before cursror' }} | ${9}   | ${false}
  `(
    'result is $expected when $input, $length',
    ({ input, length, expected }) => {
      const result = hasPreviousPage(input, length);
      expect(result).toBe(expected);
    },
  );
});
