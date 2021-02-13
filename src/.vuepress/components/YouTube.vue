<template>
  <iframe
    class="youtube"
    :width="width"
    :height="height"
    :src="url"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  >
  </iframe>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
      id: {
          type: String,
          required: true
      },
      width: Number,
      height: Number
  },
  setup(props) {
    return {
      url: `https://www.youtube.com/embed/${props.id}`,
      height: props.height,
      width: props.width,
    };
  },
});
</script>

<style>
iframe.youtube {
  margin: 40px auto;
  display: block;
}
</style>