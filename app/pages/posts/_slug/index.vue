<template>
  <div>
    <h1>{{ title }}</h1>

    <PostContent v-bind="postContentProps" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PostContent, PostContentType } from '@/components/contents';

export default Vue.extend({
  components: {
    PostContent,
  },

  data: () => ({
    slug: '',
    title: '',
    description: '',
    thumbnailUrl: '',
  }),

  computed: {
    postContentProps(): PostContentType.Props {
      return {
        slug: this.slug,
      };
    },
  },

  asyncData({ params, req, error }) {
    const { slug } = params;
    if (process.server) {
      if (req.content) {
        return { slug, ...req.content };
      } else {
        error({ statusCode: 404 });
      }
    } else {
      return { slug };
    }
  },
});
</script>
