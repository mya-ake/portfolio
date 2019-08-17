module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
  },
};
