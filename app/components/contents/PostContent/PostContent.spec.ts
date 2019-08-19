import { shallowMount, Wrapper } from '@vue/test-utils';
import PostContent from './PostContent.vue';
import { Content } from '@@/types/content.type';
import {
  createComponentLocalVue,
  createContextMock,
  createOkResponse,
  createPostData,
  clearMocks,
} from '@@/tests/fixtures';
import { CombinedVueInstance } from 'vue/types/vue';

const localVue = createComponentLocalVue();
const { mocks, createMock } = createContextMock();

afterEach(() => {
  clearMocks(mocks);
});

describe('components/contents/PostContent', () => {
  describe('mountable', () => {
    let wrapper: Wrapper<
      CombinedVueInstance<
        PostContent,
        object,
        object,
        object,
        Record<never, any>
      >
    >;

    beforeEach(() => {
      mocks.http.mockReturnValueOnce(
        createOkResponse<Content>({ data: createPostData() }),
      );

      wrapper = shallowMount(PostContent, {
        propsData: {
          slug: 'post-slug',
        },
        mocks: createMock(),
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
