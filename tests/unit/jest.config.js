module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: [
    '**/app/**/*.spec.ts',
    '**/scripts/**/*.spec.ts',
    '**/server/**/*.spec.ts',
  ],
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@@/(.*)$': '<rootDir>/$1',
  },
};
