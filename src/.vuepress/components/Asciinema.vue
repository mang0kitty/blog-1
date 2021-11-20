<template>
  <div ref="container" class="asciinema"></div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from "vue";
export default defineComponent({
  name: "asciinema",
  props: {
    cast: {
      type: String,
      required: true,
    },
  },
  mounted() {
      
  },
  setup(props) {
    const container = ref(null)

    onMounted(() => {
        let tag = window.document.createElement("script")
        tag.id = `asciicast-${props.cast}`
        tag.src = `https://asciinema.org/a/${props.cast}.js`
        tag.async = true
        container.value.appendChild(tag)
    })

    return {
        container
    };
  },
});
</script>

<style>
    .asciinema {}
</style>