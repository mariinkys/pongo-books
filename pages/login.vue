<template>
   <CustomPageTitle text="Login" />
   <AuthCustomLogin />
</template>

<script setup lang="ts">
definePageMeta({ auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/home', }, })
</script>