import {defineClientConfig} from '@vuepress/client'
import Layout from "./layouts/Layout.vue"
import BlogPost from "./layouts/BlogPost.vue"
import GitHubProject from "./layouts/GitHubProject.vue"

declare global {
    const __VUEPRESS_DEV__: boolean
    const __VUEPRESS_SSR__: boolean

    interface Window {
        cfbeacon: boolean
    }
}

export default defineClientConfig({
    enhance({ app }) {
        if (__VUEPRESS_DEV__ || __VUEPRESS_SSR__) return

        if (window.cfbeacon) {
            return
        }

        const token = "94b3601619ae48388faf84f0f160538f"
        const cfScript = window.document.createElement("script")
        cfScript.src = "https://static.cloudflareinsights.com/beacon.min.js"
        cfScript.defer = true
        cfScript.setAttribute("data-cf-beacon", JSON.stringify({ token }))

        window.document.head.appendChild(cfScript)
        window.cfbeacon = true
    },
    layouts: {
        Layout,
        BlogPost,
        GitHubProject,
    }
})