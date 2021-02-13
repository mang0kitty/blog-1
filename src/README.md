---
title: Latest Blog Post
description: Redirecting...
sidebar: false
editLink: false
---

<script lang="ts">
import {defineComponent, reactive, onMounted, onUpdated} from 'vue'
import {useRouter} from "vue-router"
import {usePagesData} from '@vuepress/client'

export default defineComponent({
    setup() {
        const router = useRouter()

        function redirectToLatest() {
            return Promise.all(Object.values(usePagesData().value).map(get => get()))
                .then(pages => {
                    const posts = pages.filter(page => page.filePathRelative?.startsWith("posts/") && page.filePathRelative !== "posts/README.md");

                    posts.sort((a, b) => b.filePathRelative > a.filePathRelative ? 1 : -1)

                    const latestPost = posts[0]
                    return router.replace({ path: latestPost.path })
                })
        }

        onUpdated(() => redirectToLatest())
        onMounted(() => redirectToLatest())
    }
})
</script>

<style>
</style>