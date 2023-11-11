<template>
   <CustomPageTitle text="Index" />
</template>

<script setup lang="ts">
definePageMeta({ auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/home', }, })
</script>