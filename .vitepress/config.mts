import { defineConfig } from 'vitepress'
import sidebar from "./sidebar"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Doc",
  description: "Technical document",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Solana', link: '/solana/' },
      { text: 'Rust', link: '/rust/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YevinDong/sol_doc' }
    ],
    logo: "data:image/png;base64,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",
  }
})
