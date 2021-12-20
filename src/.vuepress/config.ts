import type {UserConfig} from "@vuepress/cli"
import type {App, Page, PageHeader} from "@vuepress/core"
import {DefaultThemeOptions, NavbarGroup} from '@vuepress/theme-default'
import {join} from "path"
import {path} from '@vuepress/utils'

function htmlDecode(input: string): string {
  return input.replace("&#39;", "'").replace("&amp;", "&").replace("&quot;", '"')
}

function fixPageHeader(header: PageHeader) {
  header.title = htmlDecode(header.title)
  header.children.forEach(child => fixPageHeader(child))
}

const config: UserConfig = {
  lang: 'en-GB',
  title: 'Sierra Softworks Blog',
  description: 'The official Sierra Softworks blog.',

  head: [
    ['meta', { name: "description", content: "The official Sierra Softworks blog, written by Benjamin Pannell." }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  
  bundler: "@vuepress/bundler-vite",

  theme: join(__dirname, "theme", "index.ts"),

  clientAppEnhanceFiles: [
    path.resolve(__dirname, "enhance", "cloudflare.analytics.js")
  ],

  extendsMarkdown(md, app) {
    md
      .use(require("markdown-it-footnote"))
      .use(require("markdown-it-abbr"))
      .use((md) => {
        const original = md.renderer.rules.fence.bind(md.renderer.rules)
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

  extendsPageData(page, app) {
    const fixedHeaders = page.headers || []
    fixedHeaders.forEach(header => fixPageHeader(header))

    return {
      headers: fixedHeaders,
      frontmatter: {
        ...page.frontmatter,
        layout: page.frontmatter.layout || (page.filePathRelative?.startsWith("posts/") ? "BlogPost" : "Layout")
      }
    }
  },

  themeConfig: <DefaultThemeOptions>{
    logo: 'https://cdn.sierrasoftworks.com/logos/icon.png',

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
  },

  plugins: [
    ["@vuepress/plugin-google-analytics", { id: "G-WJQ1PVYVH0" }],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ]
  ]
}

export = config