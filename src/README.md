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
      link: https://git-tool.sierrasoftworks.com
    - text: Read Something
      link: /archive/
      type: secondary

footer: Copyright © Sierra Softworks 2021
---


<div class="" v-if="latestPosts">

## Latest Posts

<div class="latest-post" v-for="post in latestPosts">
    <div class="latest-post__excerpt" v-html="post.excerpt"></div>
    <div class="latest-post__metadata">
        <DateTime class="latest-post__date" :time="post.frontmatter.date" format="YYYY-MM-DD" />
        <span class="tag" v-for="tag in (post.frontmatter?.tags || [])">#{{ tag }}</span>
    </div>


<a :href="post.path">Keep Reading &rarr;</a>
</div>
</div>

<script lang="ts">
import {defineComponent, ref, onMounted, onUpdated} from 'vue'
import {useRouter} from "vue-router"
import {usePagesData} from '@vuepress/client'
import DateTime from "../../components/Date.vue"

export default defineComponent({
    components: {
        DateTime
    },
    setup() {
        const router = useRouter()
        const latestPosts = ref(null)

        onMounted(() => {
            Promise.all(Object.values(usePagesData().value).map(get => get()))
                .then(pages => {
                    const posts = pages
                        .filter(page => page.filePathRelative?.startsWith("posts/") && page.filePathRelative !== "posts/README.md")
                        .filter(page => !!page.excerpt);

                    posts.sort((a, b) => b.filePathRelative > a.filePathRelative ? 1 : -1)

                    latestPosts.value = posts.slice(0, 3)
                })
        })

        return {
            latestPosts
        }
    }
})
</script>

<style>
    .latest-post__excerpt h1 {
        font-size: 1.4rem;
    }

    .latest-post__metadata {

    }

    .latest-post__date {
        font-size: 0.9rem;
        opacity: 0.7;
    }

    .tag {
        font-size: 0.9rem;
        font-weight: bold;
        margin: 0 5px;
    }
</style>