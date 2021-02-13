---
title: Sierra Softworks Blog
description: |
    The official Sierra Softworks blog, written by Benjamin Pannell.
editLink: false
home: true

heroText: "Welcome"
tagline: "Follow us in building better services and stronger teams at scale."

actions:
    - text: Get Git-Tool
      link: /projects/git-tool/
    - text: Read Something
      link: /archive/
      type: secondary

footer: Copyright © Sierra Softworks 2021
---


<div class="" v-if="latestPost">

## Latest Post

<div class="latest-post__excerpt" v-html="latestPost.excerpt"></div>

<a :href="latestPost.path">Keep Reading &rarr;</a>

</div>

<script lang="ts">
import {defineComponent, ref, onMounted, onUpdated} from 'vue'
import {useRouter} from "vue-router"
import {usePagesData} from '@vuepress/client'

export default defineComponent({
    setup() {
        const router = useRouter()
        const latestPost = ref(null)

        onMounted(() => {
            Promise.all(Object.values(usePagesData().value).map(get => get()))
                .then(pages => {
                    const posts = pages.filter(page => page.filePathRelative?.startsWith("posts/") && page.filePathRelative !== "posts/README.md");

                    posts.sort((a, b) => b.filePathRelative > a.filePathRelative ? 1 : -1)

                    latestPost.value = posts[0]
                })
        })

        return {
            latestPost
        }
    }
})
</script>

<style>
    .latest-post__excerpt h1 {
        font-size: 1.4rem;
    }
</style>