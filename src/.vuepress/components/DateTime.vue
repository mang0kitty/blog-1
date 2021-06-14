<template>
  <time :datetime="iso">{{ formatted }}</time>
</template>

<script lang="ts">
import {defineComponent, computed, toRef} from "vue"
import dayjs from "dayjs"
import dayjsUtc from "dayjs-plugin-utc"

dayjs.extend(dayjsUtc)

export default defineComponent({
    props: {
        time: String,
        format: {
            type: String,
            default: "YYYY-MM-DD"
        }
    },
    setup(props) {
        const { time, format } = props
        const formatted = computed(() => dayjs(time).format(format))
        const iso = computed(() => dayjs(time).toISOString())

        return {
            formatted,
            iso
        }
    },
    computed: {
        
    }
})
</script>

<style>
</style>