<template>
  <figure v-html="rendered">
  </figure>
</template>

<script lang="ts">
import {Module, render} from 'viz.js/full.render'
import Viz from "viz.js"

import { defineComponent, ref, toRef, watch } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    layout: {
        type: String,
        default: "dot"
    }
  },
  setup(props) {
    const value = toRef(props, "value");
    const layout = toRef(props, "layout")
    const rendered = ref(null)

    let viz = new Viz({
        Module, render
    })

    watch(
      [value, layout],
      ([value, layout]) => {
        if (!value) {
          rendered.value = null;
          return;
        }

        viz.renderSVGElement(value, {
            engine: layout
        }).then(el => {
            rendered.value = el.outerHTML
        }).catch(err => {
            viz = new Viz({
                Module, render
            })

            console.error(err)
        })
      },
      {
        immediate: true,
      }
    );

    return {
      rendered,
    };
  },
});
</script>
