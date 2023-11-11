<template>
   <h1 class="text-center text-5xl font-bold m-5">{{ text ?? 'Missing Title' }}</h1>
</template>

<script setup lang="ts">
const props = defineProps(['text'])
</script>