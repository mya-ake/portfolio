/* eslint-disable @typescript-eslint/no-var-requires */
const withNx = require('@nrwl/next/plugins/with-nx');
const { getApiEndpoint } = require('./app.config');

const APP_ENV = process.env.APP_ENV ?? 'local';

const allowedImageOptimizationDomains =
  APP_ENV === 'local'
    ? ['placeimg.com', 'images.microcms-assets.io']
    : ['images.microcms-assets.io'];

const API_ENDPOINT = getApiEndpoint(APP_ENV);

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  poweredByHeader: false,
  images: {
    domains: allowedImageOptimizationDomains,
  },
  env: {
    APP_ENV,
    API_ENDPOINT,
  },
  async rewrites() {
    const sources = [];
    if (API_ENDPOINT) {
      sources.push({
        source: '/graphql',
        destination: API_ENDPOINT,
      });
    }

    return sources;
  },
  nx: {
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
