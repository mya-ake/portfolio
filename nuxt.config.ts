import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  srcDir: 'app',
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },

  plugins: ['@/plugins/context'],
};

export default config;
