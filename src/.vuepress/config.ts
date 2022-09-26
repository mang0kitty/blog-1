import {defineUserConfig} from 'vuepress-vite'
import type {App, Page, PageHeader} from "@vuepress/core"
import defaultTheme, {DefaultThemeOptions} from '@vuepress/theme-default'
import {join} from "path"
import {path} from '@vuepress/utils'

import mitfootnote from "markdown-it-footnote"
import mitabbr from "markdown-it-abbr"

import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics"
import {registerComponentsPlugin} from "@vuepress/plugin-register-components"

function htmlDecode(input: string): string {
  return input.replace("&#39;", "'").replace("&amp;", "&").replace("&quot;", '"')
}

function fixPageHeader(header: PageHeader) {
  header.title = htmlDecode(header.title)
  header.children.forEach(child => fixPageHeader(child))
}

export default defineUserConfig({
  lang: 'en-GB',
  title: 'Sierra Softworks Blog',
  description: 'The official Sierra Softworks blog.',

  head: [
    ['meta', { name: "description", content: "The official Sierra Softworks blog, written by Benjamin Pannell." }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  extendsMarkdown(md, app) {
    md
      .use(mitfootnote)
      .use(mitabbr)
      .use((md) => {
        const original = md.renderer.rules.fence!
        md.renderer.rules.fence = (tokens, idx, options, ...resParams) => {
          const token = tokens[idx]
          const code = token.content.trim()
          if (token.info.startsWith('mermaid')) {
            const safeCaption = token.info.slice('mermaid'.length+1).replace(/"/g, '&quot;')
            const safeCode = JSON.stringify(code).replace(/"/g, "&quot;")
            return `<ClientOnly><Mermaid :value="${safeCode}" caption="${safeCaption}" /></ClientOnly>`
          }

          return original(tokens, idx, options, ...resParams)
        }
      })
  },

  extendsPage(page, app) {
    const fixedHeaders = page.headers || []
    fixedHeaders.forEach(header => fixPageHeader(header))

    page.headers = fixedHeaders
    page.frontmatter.layout = page.frontmatter.layout || (page.filePathRelative?.startsWith("posts/") ? "BlogPost" : "Layout")
  },

  async onPrepared(app) {
    const posts = app.pages
        .filter(page => page.filePathRelative?.startsWith("posts/") && page.filePathRelative !== "posts/README.md")
        .filter(page => !!page.excerpt)

    posts.sort((a, b) => b.filePathRelative! > a.filePathRelative! ? 1 : -1)
    
    await app.writeTemp("posts.js", `export const posts = ${JSON.stringify(posts)}`)
  },

  theme: defaultTheme({
    logo: 'https://cdn.sierrasoftworks.com/logos/icon.png',
    logoDark: 'https://cdn.sierrasoftworks.com/logos/icon_light.png',

    repo: "https://github.com/SierraSoftworks",
    repoLabel: "GitHub",

    docsRepo: "SierraSoftworks/blog",
    docsDir: "src",

    editLinkText: "Suggest a change to this page",

    lastUpdated: true,
    contributors: false,

    navbar: [
      '/archive.md',
      {
        text: "Projects",
        children: [
          {
            text: "Services",
            children: [
              "/projects/bender.md"
            ]
          },
          {
            text: "Tooling",
            children: [
              "/projects/git-tool.md",
              "/projects/minback.md",
              "/projects/roadmap.md",
            ]
          },
          {
            text: "Libraries",
            children: [
              "/projects/bash-cli.md",
              "/projects/human-errors.md"
            ]
          },
          {
            text: "Legacy",
            children: [
              "/projects/arma2ml.md",
              "/projects/coremonitor.md",
              "/projects/expressgate.md",
              "/projects/wkd.md",
            ]
          }
        ]
      },
      {
        text: "Licenses",
        children: [
          {
            text: "Open Source",
            children: [
              "/licenses/MIT.md",
              "/licenses/gpl3.md",
            ]
          },
          {
            text: "Commercial",
            children: [
              "/licenses/general.md",
            ]
          }
        ]
      },
      {
        text: "About Me",
        link: "https://benjamin.pannell.dev"
      }
    ]
  }),

  plugins: [
    googleAnalyticsPlugin({ id: "G-WJQ1PVYVH0" }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ]
})