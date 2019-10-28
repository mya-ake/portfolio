module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/e2e/**/*.spec.ts'],
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/$1',
  },
  preset: 'jest-puppeteer',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tests/e2e/tsconfig.json',
    },
  },
};
