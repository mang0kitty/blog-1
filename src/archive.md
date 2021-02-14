---
title: Archive
permalink: /archive/
sidebar: false
editLink: false
---

<input class="search-box" type="text" v-model="search" placeholder="Search...">

<div v-for="year in years">

<h3 class="year-title">{{ year.year }}</h3>

<div class="archive-post" v-for="post in year.posts">

<h4 class="archive-post__title">
<a :href="post.path">{{ post.frontmatter.title }}</a>
</h4>

<div class="archive-post__metadata">
<DateTime class="archive-post__date" :time="post.frontmatter.date" format="YYYY-MM-DD" />
<span class="tag" v-for="tag in (post.frontmatter?.tags || [])">#{{ tag }}</span>
</div>

</div>

</div>

<script lang="ts">
import {onMounted, ref, reactive, computed} from 'vue'
import {usePagesData} from '@vuepress/client'
import DateTime from "../../components/Date.vue"

export default {
    components: {
        DateTime
    },
    setup() {
        const posts = reactive([])
        const search = ref(null)

        const years = computed(() => {
            const foundPosts = posts.filter(post => !search.value
                || post.frontmatter.title.toLowerCase().includes(search.value.toLowerCase())
                || (post.frontmatter.categories || []).some(category => category.includes(search.value.toLowerCase()))
                || (post.frontmatter.tags || []).some(tag => tag.includes(search.value.toLowerCase())))

            const yearsLookup = foundPosts.reduce((years, post) => {
                const year = new Date(post.frontmatter.date).getFullYear()

                years[year] = years[year] || []
                years[year].push(post)

                return years
            }, {})

            const yearsList = Object.keys(yearsLookup).map(year => ({
                year,
                posts: yearsLookup[year]
            }))

            yearsList.sort((a, b) => b.year - a.year)

            return yearsList
        })

        onMounted(() => {
            Promise.all(Object.values(usePagesData().value).map(get => get()))
                .then(pages => {
                    const postsPages = pages.filter(page => page.filePathRelative?.startsWith("posts/") && page.filePathRelative !== "posts/README.md")
                    postsPages.sort((a, b) => b.filePathRelative > a.filePathRelative ? 1 : -1)

                    posts.push(...postsPages)
                })
        })

        return {
            search,
            years
        }
    }
}
</script>

<style>
    input.search-box {
        width: 100%;
        border: none;
        border-bottom: 2px solid #eee;
        padding: 1rem;
        font-size: 1.5rem;

        transition: border-bottom 0.2s ease-in-out;
        background-color: none;
    }

    input.search-box:hover {
        border-bottom: 2px solid #ddd;
    }

    input.search-box:focus {
        border-bottom: 2px solid #1FB3FF;
        outline: none;
    }

    .year-title {
        font-weight: lighter;
        margin-top: 3rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
    }

    .tag {
        font-size: 0.9rem;
        font-weight: bold;
        margin: 0 5px;
    }

    .archive-post {
        margin-left: 4rem;
    }

    .archive-post__title {
        margin-bottom: 0;
    }

    .archive-post__title a {
        color: #000;
    }

    .archive-post__metadata {

    }

    .archive-post__date {
        font-size: 0.9rem;
        opacity: 0.7;
    }
</style>