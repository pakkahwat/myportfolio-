import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  // Deploy target: Cloudflare Workers (module syntax, with Workers Static
  // Assets). `nuxt build` emits .output/server/index.mjs (the worker) and
  // .output/public (static assets) — both wired up in wrangler.toml.
  nitro: {
    preset: 'cloudflare_module',
  },

  // Vuetify needs to be transpiled by Nuxt
  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@nuxtjs/i18n',
    // Hook vite-plugin-vuetify into Nuxt's Vite config so that
    // Vuetify components are auto-imported and tree-shaken.
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error plugins array is always defined at this point
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  // TH/EN. `no_prefix` keeps the single-page URL unchanged; content is driven
  // by the reactive `locale` (see useT / data/resume.ts). Defaults to English
  // for every new visitor; the header toggle flips it at runtime.
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'EN' },
      { code: 'th', name: 'ไทย' },
    ],
    detectBrowserLanguage: false,
  },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
    '~/assets/css/main.css',
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    head: {
      title: 'Pakkahwat Chuesaard — Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Pakkahwat Chuesaard — Software Engineer specializing in full-stack development, production troubleshooting, and ERP integration.',
        },
        { name: 'theme-color', content: '#0D1117' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
    },
  },
})
