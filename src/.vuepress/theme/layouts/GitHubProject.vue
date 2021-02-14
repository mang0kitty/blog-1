<template>
  <BaseLayout>
    <template #sidebar-bottom>
      <section class="sidebar-group">
        <p class="sidebar-heading">Extra Links</p>
        <ul>
          <li v-if="frontmatter.download">
            <a :href="frontmatter.download" class="nav-link sidebar-link">
              Download
              <OutboundLink />
            </a>
          </li>
          
          <li v-if="frontmatter.repo && frontmatter.releases">
            <a :href="releasesUrl" class="nav-link sidebar-link">
              View Releases
              <OutboundLink />
            </a>
          </li>

          <li v-if="frontmatter.repo">
            <a :href="repoUrl" class="nav-link sidebar-link">
              View on GitHub
              <OutboundLink />
            </a>
          </li>

          <li v-if="frontmatter.repo">
            <a :href="issuesUrl" class="nav-link sidebar-link">
              Report an Issue
              <OutboundLink />
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
import BaseLayout from "@vuepress/theme-default/lib/layouts/Layout.vue"
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
</style>