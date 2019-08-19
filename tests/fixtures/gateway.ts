import clonedeepwith from 'lodash.clonedeepwith';
import { HttpOkResponse } from '@/lib/http';
import { Content } from '@@/types/content.type';

export const createOkResponse = <D = any>({
  status = 200,
  data = {},
}): HttpOkResponse<D> => ({
  ok: true,
  status,
  data: clonedeepwith(data) as D,
  noResponse: false,
  canceled: false,
});

export const createPostData = (): { post: Content } => {
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
