import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  srcDir: 'app',
  render: {
    compressor: (req, res, next) => {
      next();
    },
  },

  css: ['@/assets/css/variables.css', '@/assets/css/styles.css'],

  plugins: ['@/plugins/plugins', '@/plugins/context'],

  modules: [['@nuxtjs/dotenv', { path: './' }], '@nuxtjs/style-resources'],
  devModules: ['@nuxtjs/tailwindcss'],

  styleResources: {
    scss: [
      '@/assets/scss/_variables.scss',
      '@/assets/scss/_functions.scss',
      '@/assets/scss/_mixins.scss',
    ],
  },
};

export default config;
