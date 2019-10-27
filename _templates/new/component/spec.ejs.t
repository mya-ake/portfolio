---
to: client/components/<%= category %>/<%= name %>/<%= name %>.spec.ts
---
import { shallowMount, Wrapper } from '@vue/test-utils';
import <%= name %> from './<%= name %>.vue';
import { createComponentLocalVue } from '@@/tests/fixtures';
import { CombinedVueInstance } from 'vue/types/vue';

const localVue = createComponentLocalVue();

describe('components/contents/<%= name %>', () => {
  describe('mountable', () => {
    let wrapper: Wrapper<
      CombinedVueInstance<
        <%= name %>,
        object,
        object,
        object,
        Record<never, any>
      >
    >;

    beforeEach(() => {
      wrapper = shallowMount(<%= name %>, {
        localVue,
      });
    });

    it('is vue instance', () => {
      expect(wrapper.isVueInstance()).toBe(true);
    });

    it('snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
