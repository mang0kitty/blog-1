<template>
  <BaseLayout>
    <template #sidebar-bottom>
      <section class="sidebar-group">
        <ul class="sidebar-links sidebar-links-extra">
          <p class="sidebar-heading">Extra Links</p>
          <li v-if="frontmatter.download">
            <a :href="frontmatter.download" class="nav-link sidebar-item">
              Download
            </a>
          </li>

          <li v-if="frontmatter.docs">
            <a :href="frontmatter.docs" class="nav-link sidebar-item">
              Documentation
            </a>
          </li>
          
          <li v-if="frontmatter.repo && frontmatter.releases">
            <a :href="releasesUrl" class="nav-link sidebar-item">
              View Releases
            </a>
          </li>

          <li v-if="frontmatter.repo">
            <a :href="repoUrl" class="nav-link sidebar-item">
              View on GitHub
            </a>
          </li>

          <li v-if="frontmatter.repo">
            <a :href="issuesUrl" class="nav-link sidebar-item">
              Report an Issue
            </a>
          </li>
        </ul>
      </section>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { usePageFrontmatter } from '@vuepress/client'
import BaseLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue"
import Button from "../../components/Button.vue"

export default defineComponent({
    name: "GitHubProject",
    components: {
        BaseLayout,
        Button,
    },
    setup() {
      const frontmatter = usePageFrontmatter()
      const repoUrl = computed(() => `https://github.com/${frontmatter.value.repo}`)
      const releasesUrl = computed(() => `https://github.com/${frontmatter.value.repo}/releases`)
      const issuesUrl = computed(() => `https://github.com/${frontmatter.value.repo}/issues/new`)

      return {
        frontmatter,
        repoUrl,
        releasesUrl,
        issuesUrl
      }
    }
});
</script>

<style>
.sidebar-links-extra > li {
  margin: 0 !important;
}
</style>