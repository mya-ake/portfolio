import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  srcDir: 'app',
  router: {
    base: '/dev/',
  },
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },
};

export default config;
