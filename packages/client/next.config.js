const APP_ENV = process.env.APP_ENV ?? 'local';

const allowedImageOptimizationDomains =
  APP_ENV === 'local' ? ['placeimg.com'] : ['images.microcms-assets.io'];

module.exports = {
  poweredByHeader: false,
  images: {
    domains: allowedImageOptimizationDomains,
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
};
