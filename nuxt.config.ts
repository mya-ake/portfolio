import { Configuration } from '@nuxt/types';

const config: Configuration = {
  srcDir: 'app',
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },

  css: ['@/assets/css/styles.css'],

  plugins: ['@/plugins/plugins', '@/plugins/context'],

  modules: [['@nuxtjs/dotenv', { path: './' }]],
  buildModules: ['@nuxt/typescript-build'],
  devModules: ['@nuxtjs/tailwindcss'],
};

export default config;
