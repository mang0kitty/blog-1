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


<div v-if="latestPosts">

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
import {defineComponent, ref} from 'vue'
import { posts } from '@temp/posts'

export default defineComponent({
    setup() {
        const latestPosts = ref(posts.slice(0, 3))

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