module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
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
