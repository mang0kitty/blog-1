<template>
  <div v-for="page in pages">
    <slot :page="page">
      <div v-html="page.excerpt"></div>

      <a :href="page.path">Read more &rarr;</a>

      <hr />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { usePagesData } from "@vuepress/client";

export default defineComponent({
  props: {
    prefix: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      pages: [],
    });

    onMounted(() => {
      Promise.all(Object.values(usePagesData().value).map((get) => get())).then(
        (allPages) => {
          const pages = allPages.filter(
            (page) =>
              page.filePathRelative?.startsWith(`${props.prefix}/`) &&
              page.filePathRelative !== `${props.prefix}/README.md`
          );

          pages.sort((a, b) =>
            a.filePathRelative < b.filePathRelative ? 1 : -1
          );

          state.pages = pages;
        }
      );
    });

    return state;
  },
});
</script>

<style>
</style>