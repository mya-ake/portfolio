<template>
  <div>
    <template v-if="post">
      <div v-html="post.body"></div>
    </template>

    <template v-else-if="requesting">
      <p>Requesting...</p>
    </template>

    <template v-else>
      <p>No content</p>
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted } from '@vue/composition-api';
import { usePost } from '@/hooks';
import { PostContentType } from './type';

export default createComponent({
  props: {
    slug: { required: true },
  },

  setup(props: PostContentType.Props, { root }) {
    const { request, requesting, post, hasPost } = usePost(root.$_context);

    onMounted(async () => {
      await request(props.slug);
    });

    return {
      requesting,
      post,
      hasPost,
    };
  },
});
</script>
