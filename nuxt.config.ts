import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  srcDir: 'app',
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },

  css: ['@/assets/css/styles.css'],

  plugins: ['@/plugins/plugins', '@/plugins/context'],

  modules: [['@nuxtjs/dotenv', { path: './' }]],
  devModules: ['@nuxtjs/tailwindcss'],
};

export default config;
