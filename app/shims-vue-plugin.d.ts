import { Context } from '@/plugins/context/type';

declare module 'vue/types/vue' {
  interface Vue {
    $_context: Context;
  }
}
