import {defineClientConfig} from '@vuepress/client'
import Layout from "./layouts/Layout.vue"
import BlogPost from "./layouts/BlogPost.vue"
import GitHubProject from "./layouts/GitHubProject.vue"

export default defineClientConfig({
    layouts: {
        Layout,
        BlogPost,
        GitHubProject,
    }
})