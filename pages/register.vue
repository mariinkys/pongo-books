<template>
   <CustomPageTitle text="Register" />
   <AuthCustomRegister />
</template>

<script setup lang="ts">
definePageMeta({ auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/home', }, })
</script>