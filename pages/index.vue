<template>
   <CustomPageTitle text="Welcome to Pongo Books" />
</template>

<script setup lang="ts">
definePageMeta({ auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/home', }, })
</script>