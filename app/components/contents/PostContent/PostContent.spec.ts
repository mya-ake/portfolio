import { shallowMount, createLocalVue } from '@vue/test-utils';
import { plugin } from 'vue-function-api';
import PostContent from './PostContent.vue';
import { Content } from '@@/types/content.type';

const localVue = createLocalVue();
localVue.use(plugin);

const mocks = {
  http: jest.fn(),
};

const createMocks = () => {
  return {
    $_context: {
      http: {
        request: mocks.http,
      },
    },
  };
};

const createResponse = ({
  status = 200,
  ok = true,
  data = {},
}: {
  status?: number | undefined;
  ok?: boolean;
  data?: unknown;
} = {}) => ({
  ok,
  status,
  data: { ...data },
});

const createPostData = (): { post: Content } => {
  return {
    post: {
      title: 'post title',
      description: 'post description',
      body: '<h1>post title</h1>',
      thumbnailUrl: 'https://example.com/image.png',
      createdAt: '2019-08-01',
      updatedAt: '2019-08-01',
      twitterCardType: 'summary',
    },
  };
};

afterEach(() => {
  mocks.http.mockClear();
});

describe('components/contents/PostContent', () => {
  describe('mountable', () => {
    it('is vue instance', () => {
      mocks.http.mockReturnValueOnce(
        createResponse({ data: createPostData() }),
      );
      const wrappre = shallowMount(PostContent, {
        propsData: {
          slug: 'post-slug',
        },
        mocks: createMocks(),
        localVue,
      });
      expect(wrappre.isVueInstance()).toBe(true);
    });
  });
});
