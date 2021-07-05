<template>
    <GraphViz class="dot-figure" :layout="layout" :value="content?.innerText" />
    <div class="dot-hidden" ref="content">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'

export default defineComponent({
    props: {
        layout: {
            type: String,
            default: "dot"
        }
    },
    setup(props) {
        const content = ref(null)
        const layout = toRef(props, "layout")

        return {
            layout,
            content
        }
    },
})
</script>

<style scoped>
.dot-figure {
    margin: 0 auto;
    text-align: center;
}

.dot-hidden {
    display: none;
}
</style>
