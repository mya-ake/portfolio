module.exports = {
  preset: 'ts-jest',
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^~fixtures/(.*)$': '<rootDir>/tests/fixtures/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.unit.json',
    },
  },
};
