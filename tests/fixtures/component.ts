import { createLocalVue } from '@vue/test-utils';
import { plugin } from 'vue-function-api';

export const createComponentLocalVue = () => {
  const localVue = createLocalVue();
  localVue.use(plugin);
  return localVue;
};
