<template>
  <div>
    <h1>About</h1>

    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    title: '',
    description: '',
    thumbnailUrl: '',
  }),

  asyncData({ req, error }) {
    if (process.server) {
      if (req.content) {
        return { ...req.content };
      } else {
        error({ statusCode: 404 });
      }
    } else {
      return {};
    }
  },
});
</script>
