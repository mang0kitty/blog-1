import { defineClientAppEnhance } from '@vuepress/client'

const token = "94b3601619ae48388faf84f0f160538f"

export default defineClientAppEnhance(() => {
    if (__VUEPRESS_DEV__ || __VUEPRESS_SSR__) return

    if (window.cfbeacon) {
        return
    }

    const cfScript = document.createElement("script")
    cfScript.src = "https://static.cloudflareinsights.com/beacon.min.js"
    cfScript.defer = true
    cfScript.setAttribute("data-cf-beacon", JSON.stringify({ token }))

    document.head.appendChild(cfScript)
    window.cfbeacon = true
})