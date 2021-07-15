const APP_ENV = process.env.APP_ENV ?? 'local';

const allowedImageOptimizationDomains =
  APP_ENV === 'local' ? ['placeimg.com'] : [];

module.exports = {
  poweredByHeader: false,
  images: {
    domains: allowedImageOptimizationDomains,
  },
};
