import { Content, AppHttp } from '@/types';

export const getPost = (http: AppHttp, slug: string) => {
  return http.request<{ post: Content }>({
    method: 'get',
    url: `posts/${slug}`,
  });
};
