module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/e2e/**/*.spec.ts'],
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/$1',
    '^@@/(.*)$': '<rootDir>/$1',
  },
};
