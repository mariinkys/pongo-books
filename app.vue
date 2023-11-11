<template>
  <div>

    <Head>
      <Title>Pongo Books</Title>
    </Head>
    <NuxtLayout>
      <Header :logged-in="loggedIn" />
      <div class="p-5">
        <NuxtPage />
        <Toast />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { status } = useAuth()
const loggedIn = computed(() => status.value === 'authenticated')

useSeoMeta({
  description: 'A book organizer application',
  ogTitle: 'Pongo Books',
  ogDescription: 'A book organizer application',
  ogImage: '/android-chrome-512x512.png',
  // ogUrl: '[og:url]',
  // twitterTitle: '[twitter:title]',
  // twitterDescription: '[twitter:description]',
  // twitterImage: '[twitter:image]',
  // twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico'
    }
  ]
})
</script>