import { createPost } from '@mya-ake-com/mock';

export const mocks = {
  Post: (): ReturnType<typeof createPost> => createPost(),
};
