import { createLocalVue } from '@vue/test-utils';
import VueCompositionApi from '@vue/composition-api';

export const createComponentLocalVue = () => {
  const localVue = createLocalVue();
  localVue.use(VueCompositionApi);
  return localVue;
};
