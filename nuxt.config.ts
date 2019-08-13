import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  srcDir: 'app',
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },

  css: ['@/assets/css/styles.css'],

  plugins: ['@/plugins/context'],

  devModules: ['@nuxtjs/tailwindcss'],
};

export default config;
