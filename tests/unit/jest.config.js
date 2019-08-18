module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@@/(.*)$': '<rootDir>/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/app/**/*.spec.ts',
    '**/scripts/**/*.spec.ts',
    '**/server/**/*.spec.ts',
  ],
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
};
