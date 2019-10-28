import { Configuration } from '@nuxt/types';

const config: Configuration = {
  srcDir: 'client',
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },

  css: ['@/assets/css/styles.css'],

  plugins: ['@/plugins/plugins', '@/plugins/context'],

  modules: [['@nuxtjs/dotenv', { path: './' }]],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
};

export default config;
