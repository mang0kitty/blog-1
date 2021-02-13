<template>
  <BaseLayout>
    <template #page-bottom>
      <Disqus v-if="frontmatter.comments !== false" />
      <AboutMe />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { usePageFrontmatter } from '@vuepress/client'
import BaseLayout from "@vuepress/theme-default/lib/layouts/Layout.vue"
import AboutMe from "../../components/AboutMe.vue"
import Disqus from "../../components/Disqus.vue"

export default defineComponent({
    name: "BlogPost",
    components: {
        AboutMe,
        BaseLayout,
        Disqus
    },
    setup() {
      const frontmatter = usePageFrontmatter()

      return {
        frontmatter
      }
    }
});
</script>

<style>
</style>