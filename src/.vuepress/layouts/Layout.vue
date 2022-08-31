<template>
  <BaseLayout>
    <template #page-bottom>
        <AboutMe />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { usePageFrontmatter } from '@vuepress/client'
import BaseLayout from "@vuepress/theme-default/layouts/Layout.vue";
import AboutMe from "../components/AboutMe.vue"

export default defineComponent({
    name: "ImprovedLayout",
    components: {
        AboutMe,
        BaseLayout,
    }
});
</script>

<style>
</style>