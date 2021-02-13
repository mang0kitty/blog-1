<template>
  <div ref="container" class="comments">
    <h2>Comments</h2>
    <div id="disqus_thread"></div>
    <noscript>
      Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript" />comments powered by Disqus.
    </noscript>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "Disqus",
  props: {
    website: {
      type: String,
      required: false,
      default: "sierrasoftworks",
    },
  },
  mounted() {},
  setup(props) {
    const container = ref(null);

    onMounted(() => {
      let tag = document.createElement("script");
      tag.src = `https://${props.website}.disqus.com/embed.js`;
      tag.setAttribute("data-timestamp", +new Date());
      container.value.appendChild(tag);
    });

    return {
      container,
    };
  },
});
</script>

<style>
.comments {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;
}
</style>