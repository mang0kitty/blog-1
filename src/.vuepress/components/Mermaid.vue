<template>
    <figure>
        <div v-html="rendered"></div>
        <figcaption>{{ caption }}</figcaption>
    </figure>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch, computed } from 'vue'
import mermaid from 'mermaid/dist/mermaid.esm.min'

mermaid.initialize({
    theme: 'dark',
    flowchart: {
        width: "100%"
    },
    sequence: {
        showSequenceNumbers: true
    }
})

export default defineComponent({
    props: {
        value: String,
        caption: String
    },
    setup(props) {
        const id = Math.floor(Math.random() * 1e6)
        const value = toRef(props, "value")
        const caption = toRef(props, "caption")
        const rendered = ref(null)
        watch(value, newValue => {
            try
            {
                mermaid.render(`mermaid-${id}`, newValue, (svg) => {
                    rendered.value = svg
                })
            } catch(err) {
                throw new Error("Mermaid cannot be used in SSR mode, ensure that it is wrapped in <ClientOnly> tags.")
            }
        }, {
            immediate: true
        })

        return {
            caption,
            rendered,
        }
    },
})
</script>

<style scoped>
figcaption {
    text-align: center;
    font-size: 0.9rem;
    font-style: italic;
}
</style>