<template>
  <BaseLayout>
    <template #sidebar-bottom>
      <section class="sidebar-group">
        <p class="sidebar-heading">About</p>
        <ul>
          <li class="post-metadata__item">
            Authored
            <DateTime class="post-metadata__date" :time="frontmatter.date" />
          </li>

          <li class="post-metadata__item">
            <span class="tag" v-for="tag in frontmatter.tags || []"
              >#{{ tag }}</span
            >
          </li>
        </ul>
      </section>
    </template>

    <template #page-bottom>
      <Disqus v-if="frontmatter.comments !== false" />
      <AboutMe />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import BaseLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import AboutMe from "../../components/AboutMe.vue";
import Disqus from "../../components/Disqus.vue";

export default defineComponent({
  name: "BlogPost",
  components: {
    AboutMe,
    BaseLayout,
    Disqus,
  },
  setup() {
    const frontmatter = usePageFrontmatter();

    return {
      frontmatter,
    };
  },
});
</script>

<style>
.post-metadata__item {
      padding: .35rem 1rem .35rem 2rem;
}

.post-metadata__date {
  font-size: 0.9rem;
  opacity: 0.7;
}

.tag {
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 5px;
}
</style>