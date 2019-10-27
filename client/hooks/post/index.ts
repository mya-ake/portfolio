import { ref, computed } from '@vue/composition-api';
import { getPost } from '@/gateways/post.gateway';
import { AppHttp, Content } from '@/types';

export const usePost = ({ http }: { http: AppHttp }) => {
  const post = ref<Content | null>(null);
  const hasPost = computed(() => post !== null);
  const requesting = ref(false);

  const request = async (slug: string) => {
    requesting.value = true;
    const response = await getPost(http, slug);
    if (response.ok) {
      post.value = response.data.post;
    }
    requesting.value = false;
  };

  return { request, requesting, post, hasPost };
};
