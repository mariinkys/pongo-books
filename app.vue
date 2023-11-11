<template>
  <div>
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
</script>