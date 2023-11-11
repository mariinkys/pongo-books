// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  meta: {
    title: 'Pongo Books',
  },
  modules: ['@sidebase/nuxt-auth', 'nuxt-primevue'],
  css: ['primevue/resources/themes/lara-dark-teal/theme.css', '~/assets/css/main.css', 'primeicons/primeicons.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    usePrimeVue: true,
    options: {},
    importPT: undefined,
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    },
    directives: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    },
    composables: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    }
  },
  auth: {
    globalAppMiddleware: true,
    origin: 'http://localhost:3000',
  }
})
