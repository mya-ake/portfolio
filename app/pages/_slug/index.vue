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

  asyncData({ req }) {
    if (process.server) {
      return { ...req.content };
    } else {
      return {};
    }
  },
});
</script>
