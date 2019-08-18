<template>
  <div class="post-content">
    <template v-if="post">
      <div class="content" v-html="post.body"></div>
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
import { createComponent, onMounted } from 'vue-function-api';
import { usePost } from '@/hooks';
import { PostContentType } from './type';

export default createComponent({
  props: {
    slug: {},
  } as PostContentType.PropsType,

  setup({ slug }, { root }) {
    const { request, requesting, post, hasPost } = usePost(root.$_context);

    onMounted(async () => {
      await request(slug);
    });

    return {
      requesting,
      post,
      hasPost,
    };
  },
});
</script>

<style lang="scss" scoped>
.post-content {
  max-width: var(--width-content);
  margin: 0 auto;
  padding: 0 space(4);
  @include media(small) {
    padding: 0;
  }
}
</style>

<style lang="scss">
.post-content {
  p {
    margin: 1em 0;
  }
}
</style>
