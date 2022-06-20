/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

module.exports = {
  content: [join(__dirname, 'src/**/*.{ts,tsx}')],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
